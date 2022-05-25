import { request, gql } from 'graphql-request';
import { Post, GraphQLFetchResponse, GraphQLConnectionResponse } from '../schema';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT ?? '';
export const getPosts = async () => {
    const query = gql`
        query Posts {
            postsConnection {
                edges {
                    node {
                        createdAt
                        slug
                        title
                        excerpt
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
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

    const results: GraphQLConnectionResponse<Post> = await request(graphqlAPI, query);
    return results.postsConnection.edges.map((edge) => edge.node);
};

export const getPostDetails = async (slug: string | string[]) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: { slug: $slug }) {
                createdAt
                slug
                title
                excerpt
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content {
                    raw
                }
            }
        }
    `;

    const results: GraphQLFetchResponse<Post> = await request(graphqlAPI, query, {
        slug,
    });
    return results.post;
};

export const getRecentPosts = async () => {
    const query = gql`
        query GetRecentPosts() {
            posts(
                orderBy: createdAt_ASC,
                last: 3
            ) {
                createdAt
                slug
                title
                featuredImage {
                    url
                }
            }
        }
    `;
    const results: GraphQLFetchResponse<Post[]> = await request(graphqlAPI, query);
    return results.posts;
};

export const getSimilarPosts = async (slug: string, categories: string[]) => {
    const query = gql`
        query GetSimilarPosts($slug: String!, $categories: [String!]) {
            posts(
                where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
                last: 3
            ) {
                createdAt
                slug
                title
                featuredImage {
                    url
                }
            }
        }
    `;
    const results: GraphQLFetchResponse<Post[]> = await request(graphqlAPI, query, {
        slug,
        categories,
    });
    return results.posts;
};

export const getFeaturedPosts = async () => {
    const query = gql`
        query GetFeaturedPosts() {
            posts(
                where: { featuredPost: true }
                last: 3
            ) {
                createdAt
                slug
                title
                author {
                    name
                    photo {
                        url
                    }
                }
                featuredImage {
                    url
                }
            }
        }
    `;
    const results: GraphQLFetchResponse<Post[]> = await request(graphqlAPI, query);
    return results.posts;
};

