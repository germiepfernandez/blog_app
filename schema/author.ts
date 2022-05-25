import { GraphQLData } from './index';

export interface Author extends GraphQLData {
    bio: string;
    name: string;
    photo: {
        url: string;
    }
}
