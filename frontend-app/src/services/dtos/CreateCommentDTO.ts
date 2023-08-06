interface CreateCommentDTO {
    author_id: string;
    publication_id: string;
    c_text: string;
    c_parent_id?: string;
}

export default CreateCommentDTO;