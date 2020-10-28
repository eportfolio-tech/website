export default interface IContent {
    id: number;
    title: string;
    username: string;
    userId: number;
    content: any;
    description: string;
    coverImage?: any;
    visibility?: 'PUBLIC' | 'PRIVATE';
    deleted?: boolean;
    createdDate?: Date;
    updatedDate?: Date;

    updatedOn?: string;
}
