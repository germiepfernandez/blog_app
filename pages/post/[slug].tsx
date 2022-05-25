import React from 'react';
import { useRouter } from 'next/router';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { getPosts, getPostDetails } from '../../services';
import {
    PostDetail,
    Categories,
    PostWidget,
    Author,
    Comments,
    CommentsForm,
    Loader,
} from '../../components';
import { Post } from '../../schema';

interface Props {
    post?: Post;
}

const PostDetails = ({ post }: Props) => {
    const router = useRouter();

    if (router.isFallback) {
        return <Loader />;
    }

    return (
        <div className="container mx-auto mb-8 px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post?.author} />
                    <CommentsForm slug={post?.slug} />
                    <Comments slug={post?.slug} />
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative top-8 lg:sticky">
                        <PostWidget
                            slug={post?.slug}
                            categories={post?.categories.map((c) => c.slug)}
                        />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let post: Post | null = null;
    if (params && params.slug) {
        post = await getPostDetails(params.slug ?? '');
    }

    return {
        props: { post: post ?? null },
    };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const posts = await getPosts();

    return {
        paths: posts.map(({ slug }) => ({ params: { slug } })),
        fallback: true,
    };
};
