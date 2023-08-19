import { authenticatedApi } from "../api/api";
import ReactionDTO from "./dtos/ReactionDTO";

async function createLikePublication(publicationId: string, reactionDTO: ReactionDTO): Promise<any> {
    return await authenticatedApi.post(`/publication/${publicationId}/react`, reactionDTO);
}

async function removeLikePublication(publicationId: string, reactionDTO: ReactionDTO): Promise<any> {
    return await authenticatedApi.patch(`/publication/${publicationId}/unreact`, reactionDTO);
}

async function hasLikedPublication(publicationId: string, reactionDTO: ReactionDTO): Promise<any> {
    return await authenticatedApi.post(`/publication/${publicationId}/hasReacted`, reactionDTO);
}

export {
    createLikePublication,
    removeLikePublication,
    hasLikedPublication
}