import moment from 'moment';
import React from 'react';

import { Post } from '../schema';
import { ElementNode, Text } from '../schema/graphcms/rich-text-types';

interface Props {
    post?: Post;
}

const PostDetail = ({ post }: Props) => {
    console.log(post?.content.raw);
    const getContentFragment = (
        index: number,
        text: string | JSX.Element | null,
        obj: ElementNode | Text,
        type: string,
        children: (string | JSX.Element | null)[] = [],
    ) => {
        let modifiedText = text;

        if (obj) {
            if (obj.bold) {
                modifiedText = <b key={index}>{text}</b>;
            }

            if (obj.italic) {
                modifiedText = <em key={index}>{text}</em>;
            }

            if (obj.underline) {
                modifiedText = <u key={index}>{text}</u>;
            }
        }

        switch (type) {
            case 'heading-two':
                return (
                    <h2 key={index} className="mb-4 text-xl font-semibold">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h2>
                );
            case 'heading-three':
                return (
                    <h3 key={index} className="mb-4 text-xl font-semibold">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h3>
                );
            case 'heading-four':
                return (
                    <h4 key={index} className="text-md mb-4 font-semibold">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </h4>
                );
            case 'image':
                if ('title' in obj) {
                    return (
                        <img
                            key={index}
                            alt={obj.title}
                            height={obj.height}
                            width={obj.width}
                            src={obj.src}
                        />
                    );
                }
            case 'paragraph':
                return (
                    <p key={index} className="mb-8">
                        {children.map((item, i) => (
                            <React.Fragment key={i}>{item}</React.Fragment>
                        ))}
                    </p>
                );
            default:
                return modifiedText;
        }
    };

    return (
        <div className="mb-8 rounded-lg bg-white pb-12 shadow-lg lg:p-8">
            <div className="relative mb-6 overflow-hidden shadow-md">
                <img
                    src={post?.featuredImage.url}
                    alt={post?.title}
                    className="h-full w-full rounded-t-lg object-top"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="mb-8 flex w-full items-center">
                    <div className="item-center mb-4 mr-8 flex w-full lg:mb-0 lg:w-auto">
                        <img
                            height="30px"
                            width="30px"
                            className="rounded-full align-middle"
                            src={post?.author.photo.url}
                            alt={post?.author.name}
                        />
                        <p className="ml-2 inline align-middle text-lg text-gray-700">
                            {post?.author.name}
                        </p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 inline h-6 w-6 text-pink-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span>{moment(post?.createdAt).format('MMM DD, YYYY')}</span>
                    </div>
                </div>
                <h1 className="font-semibol mb-8 text-3xl">{post?.title}</h1>
                {post?.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) =>
                        getContentFragment(itemIndex, item.text, item, ''),
                    );

                    return getContentFragment(index, null, typeObj, typeObj.type, children);
                })}
            </div>
        </div>
    );
};

export default PostDetail;