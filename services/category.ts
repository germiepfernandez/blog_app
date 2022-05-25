import { request, gql } from 'graphql-request';
import { Category, GraphQLConnectionResponse, GraphQLFetchResponse } from '../schema';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? '';

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `;

    const results: GraphQLFetchResponse<Category[]> = await request(graphqlAPI, query);
    return results.categories;
};

export const getCategoryPost = async (slug: string | string[]) => {
    const query = gql`
        query GetCategoryPost($slug: String!) {
            postsConnection(where: { categories_some: { slug: $slug } }) {
                edges {
                    cursor
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredImage {
                            url
                        }
                        categories {
                            name
                            slug
                        }
                    }
                }
            }
        }
    `;

    const results: GraphQLConnectionResponse<Category> = await request(graphqlAPI, query, { slug });
    return results.postsConnection.edges.map((edge) => edge.node);
};
