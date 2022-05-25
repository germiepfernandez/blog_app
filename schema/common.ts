export interface GraphQLData {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GraphQLFetchResponse<T> {
    [key: string]: T;
}

export interface GraphQLConnectionResponse<T> {
    [key: string]: {
        edges: Array<{ node: T }>;
    };
}
