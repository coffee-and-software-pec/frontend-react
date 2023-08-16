import { api } from "../api/api";
import Publication from "../models/Publication";
import { ReviewDTO } from "./dtos/ReviewDTO";

async function createReview(publicationId: string, reviewDTO: ReviewDTO): Promise<Publication> {
    const { data } = await api.post(`/review/${publicationId}`, reviewDTO);
    return data as Publication;
}

async function getReviews(publicationId: string) {
    const { data } = await api.get(`/review/${publicationId}`);
    return data as ReviewDTO[];
}

async function editReview(reviewId: string, reviewText: string) {
    const { data } = await api.patch(`/review/${reviewId}`, {reviewText});
    return data as ReviewDTO;
}

async function deleteReview(reviewId: string): Promise<void> {
    const { data } = await api.delete(`/review/${reviewId}`);
}

export {
    createReview,
    getReviews,
    editReview,
    deleteReview
}