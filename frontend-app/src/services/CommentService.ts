import { api } from "../api/api";
import PublicationComment from "../models/PublicationComment";
import CreateCommentDTO from "./dtos/CreateCommentDTO";

async function createComment(comment: CreateCommentDTO): Promise<PublicationComment> {
    const { data } = await api.post(`/comment`, comment);
    return data as PublicationComment;
}

async function updateComment(comment: { text: string }, commentId: string): Promise<PublicationComment> {
    const { data } = await api.patch(`/comment/${commentId}`, comment);
    return data as PublicationComment;
}

async function deleteComment(commentId: string): Promise<PublicationComment> {
    const { data } = await api.delete(`/comment/${commentId}`);
    return data as PublicationComment;
}

async function getCommentsByPublicationId(publicationId: string): Promise<PublicationComment[]> {
    const { data } = await api.get(`/comment/byPublication/${publicationId}`);
    return data as PublicationComment[];
}

export {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPublicationId
}