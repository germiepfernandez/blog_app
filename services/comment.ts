import { request, gql } from 'graphql-request';

import { Comment, GraphQLFetchResponse } from '../schema';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? '';

export const submitComment = async (comment: Comment, slug: string) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...comment,
            slug,
        }),
    });

    return result.json;
};

export const getComments = async (slug: string) => {
    const query = gql`
        query GetComments($slug: String!) {
            comments(where: { post: { slug: $slug } }) {
                name
                createdAt
                comment
            }
        }
    `;

    const results: GraphQLFetchResponse<Comment[]> = await request(graphqlAPI, query, { slug });
    return results.comments;
};
