import { api, authenticatedApi } from "../api/api";
import LandPublication from "../models/LandPublication";
import Publication from "../models/Publication";
import { RelatedPublication } from "../models/RelatedPublication";
import CreatePublicationDTO from "./dtos/CreatePublicationDTO";
import UpdatePublicationDTO from "./dtos/UpdatePublicationDTO";

async function createPublication(publication: CreatePublicationDTO): Promise<Publication> {
    const response = await authenticatedApi.post("/publication", publication);
    return response.data;
}

async function updatePublication(publicationId: string, publication: UpdatePublicationDTO): Promise<Publication> {
    const response = await authenticatedApi.patch(`/publication/${publicationId}`, publication);
    return response.data;
}

async function publishPublication(publicationId: string): Promise<Publication> {
    const response = await authenticatedApi.patch(`/publication/${publicationId}/publish`);
    return response.data;
}

async function getPublicationById(publicationId: string): Promise<Publication> {
    const data = (await api.get(`/publication/${publicationId}`)).data;
    return data as Publication;
}

async function deletePublication(publicationId: string): Promise<any> {
    return await authenticatedApi.delete(`/publication/${publicationId}`);
}

async function getSortedPublications(column: string = "date", order: string = "desc"): Promise<Publication[]> {
    const data = await (await api.get(`/publication`)).data;
    return data as Publication[];
}

async function getTrendingPublications(column: string = "date", order: string = "desc"): Promise<Publication[]> {
    const data = await (await api.get(`/publication/trendingPublications`)).data;
    return data as Publication[];
}

async function getTopPublications(column: string = "date", order: string = "desc"): Promise<Publication[]> {
    const data = await (await api.get(`/publication/popularPublications`)).data;
    return data as Publication[];
}

async function getSortedPublicationsByTags(tags: string[]): Promise<Publication[]> {
    const { data } = await api.get(`/publication/byTag?tags=${tags.join(',')}`);
    return data as Publication[];
}

async function getPublicationsBySearchText(searchText: string): Promise<Publication[]> {
    const { data } = await api.get(`/publication/bySearch/${searchText}`);
    return data as Publication[];
}

async function getLandingPublications(): Promise<Publication[]> {
    const { data } = await api.get("/publication/landingPublications");
    return data as Publication[];
}

async function getUserPublications(userId: string): Promise<Publication[]> {
    const { data } = await authenticatedApi.get(`/publication/userPublications/${userId}`);
    return data as Publication[];
}

async function getUserPublicationsByTags(userId: string, tags: string[]): Promise<Publication[]> {
    const { data } = await authenticatedApi.get(`/publication/userPublications/${userId}/byTags?tags=${tags.join(',')}`);
    return data as Publication[];
}

async function getRelatedPublications(): Promise<RelatedPublication[]> {
    const { data } = await api.get("/publication/related");
    return data as RelatedPublication[];
}

export { 
    getPublicationById,
    getSortedPublications,
    getTrendingPublications,
    getTopPublications,
    getSortedPublicationsByTags,
    getPublicationsBySearchText,
    createPublication,
    updatePublication,
    publishPublication,
    getLandingPublications,
    getUserPublications,
    getUserPublicationsByTags,
    getRelatedPublications,
    deletePublication
}