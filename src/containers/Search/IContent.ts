export default interface IContent {
    id: number;
    title: string;
    username: string;
    userId: number;
    content: string;
    description: string;
    visibility?: 'PUBLIC' | 'PRIVATE';
    deleted?: boolean;
    createdAt?: string;
    updatedOn?: string;
}
