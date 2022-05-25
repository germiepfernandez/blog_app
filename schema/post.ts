import { Category } from './category';
import { RichTextContent } from './graphcms/rich-text-types';
import { Author, GraphQLData } from './index';

export interface Post extends GraphQLData {
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: {
        url: string;
    };
    author: Author;
    categories: Category[];
    content: {
        raw: RichTextContent;
    };
}
