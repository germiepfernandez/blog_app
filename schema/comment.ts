import { GraphQLData } from './index';

export interface Comment extends GraphQLData {
    name: string;
    email: string;
    comment: string;
}