import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Post } from '../schema';
import { getRecentPosts, getSimilarPosts } from '../services';

interface Props {
    slug?: string;
    categories?: string[];
}

const PostWidget = ({ categories = [], slug = '' }: Props) => {
    const [relatedPost, setRelatedPost] = useState<Post[]>([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(slug, categories).then((result) => setRelatedPost(result));
        } else {
            getRecentPosts().then((result) => setRelatedPost(result));
        }
    }, []);

    return (
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPost.map((post) => {
                return (
                    <div key={post.title} className="mb-4 flex w-full items-center">
                        <div className="w-16 flex-none">
                            <img
                                alt={post.title}
                                height="60px"
                                width="60px"
                                className="rounded-full align-middle"
                                src={post.featuredImage.url}
                            />
                        </div>
                        <div className="ml-4 flex-grow">
                            <p className="font-xs text-gray-500">
                                {moment(post.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <Link href={`/post/${post.slug}`} className="text-md">
                                {post.title}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PostWidget;
