export interface ReviewDTO {
    id?: string;
    author: {
        authorId: string;
        authorName?: string;
        authorPhoto?: string;
    },
    reviewText: string;
    markedText: string;
    createdAt?: string;
}