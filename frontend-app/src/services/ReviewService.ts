import { api } from "../api/api";
import { ReviewDTO } from "./dtos/ReviewDTO";

async function createReview(publicationId: string, reviewDTO: ReviewDTO): Promise<ReviewDTO> {
    const { data } = await api.post(`/review/${publicationId}`, reviewDTO);
    return data as ReviewDTO;
}

async function getReviews(publicationId: string) {
    const { data } = await api.get(`/review/${publicationId}`);
    return data as ReviewDTO;
}

async function editReview(reviewId: string, reviewDTO: ReviewDTO) {
    const { data } = await api.patch(`/review/${reviewId}/edit`, reviewDTO);
    return data as ReviewDTO;
}

async function deleteReview(reviewId: string) {
    const { data } = await api.delete(`/review/${reviewId}/delete`);
    return data as ReviewDTO;
}

export {
    createReview,
    getReviews,
    editReview,
    deleteReview
}