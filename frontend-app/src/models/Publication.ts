import PublicationComment from "./PublicationComment"

export default interface Publication {
    id: number;
    authorData: {
        authorId: string;
        authorName: string;
        authorPhoto: string;
    };
    date: number;
    visualizationsCount: number;
    heartsCount: number;
    commentsCount: number;
    tags: string[];
    title: string;
    subtitle: string;
    thumbnail: string;
    content: string;
    comments: PublicationComment[]
}