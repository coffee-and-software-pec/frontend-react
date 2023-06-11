import { api } from "../api/api";
import PublicationComment from "../models/PublicationComment";
import CreateCommentDTO from "./dtos/CreateCommentDTO";

async function createComment(comment: CreateCommentDTO): Promise<PublicationComment> {
    const { data } = await api.post(`/comment`, comment);
    return data as PublicationComment;
}

async function updateComment(comment: PublicationComment, publicationId: string): Promise<PublicationComment> {
    const { data } = await api.patch(`/publication/${publicationId}/comment/${comment.c_id}`, comment);
    return data as PublicationComment;
}

async function deleteComment(comment: PublicationComment, publicationId: string): Promise<PublicationComment> {
    const { data } = await api.delete(`/publication/${publicationId}/comment/${comment.c_id}`);
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