import React from 'react';
import Image from 'next/image';

import { Author as AuthorType } from '../schema';

interface Props {
    author?: AuthorType;
}

const Author = ({ author }: Props) => {
    return (
        <div className="relative mt-20 mb-8 rounded-lg bg-black bg-opacity-20 p-12 text-center">
            <div className="absolute left-0 right-0 -top-14">
                <Image
                    unoptimized
                    src={author ? author.photo.url : ''}
                    alt={author?.name}
                    width="100px"
                    height="100px"
                    className="rounded-full align-middle"
                />
            </div>
            <h3 className="my-4 text-xl font-bold text-white">{author?.name}</h3>
            <p className="text-lg text-white">{author?.bio}</p>
        </div>
    );
};

export default Author;
