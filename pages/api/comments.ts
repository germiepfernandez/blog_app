/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */
import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? '';

export default async function comments(
    req: NextApiRequest,
    res: NextApiResponse<{ id: string } | unknown>,
) {
    const graphQLClient = new GraphQLClient(graphQLAPI, {
        headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_Token}`,
        },
    });

    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
            createComment(
                data: {
                    name: $name
                    email: $email
                    comment: $comment
                    post: { connect: { slug: $slug } }
                }
            ) {
                id
            }
        }
    `;

    try {
        const result = await graphQLClient.request(query, req.body);
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
    }
}
