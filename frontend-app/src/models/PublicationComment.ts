export default interface PublicationComment {
    c_id: string;
    author: {
        u_id: string;
        u_name: string;
        photoURL: string;
    };
    creation_date: string;
    c_text: string;
    c_parent_id: string;
    replies?: PublicationComment[]
}