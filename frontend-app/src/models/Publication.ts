import PublicationComment from "./PublicationComment"

export default interface Publication {
    id: number;
    author: string;
    date: number;
    visualizationsCount: number;
    heartsCount: number;
    commentsCount: number;
    tags: string[];
    content: string;
    comments: PublicationComment[]
}