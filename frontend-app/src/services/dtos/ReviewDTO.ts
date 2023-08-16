export interface ReviewDTO {
    r_id?: string;
    authorId?: string;
    author?: {
        u_id: string;
        u_name?: string;
        photoURL?: string;
    },
    comment: string;
    text: string;
    date?: string;
}