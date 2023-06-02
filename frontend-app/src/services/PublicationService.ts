import { api } from "../api/api";
import LandPublication from "../models/LandPublication";
import Publication from "../models/Publication";
import { RelatedPublication } from "../models/RelatedPublication";
import CreateProjectDTO from "./dtos/CreateProjectDTO";
import UpdateProjectDTO from "./dtos/UpdateProjectDTO";

async function getPublicationById(publicationId: string): Promise<Publication> {
    const data = (await api.get(`/publication/${publicationId}`)).data;
    return data as Publication;
}

async function getSortedPublications(): Promise<Publication[]> {
    const data = await (await api.get("/publication")).data;
    return data as Publication[];
}

async function getSortedPublicationsByTags(tags: string[]): Promise<Publication[]> {
    const { data } = await api.get(`/publication/byTag?tags=${tags.join(',')}`);
    return data as Publication[];
}

async function createPublication(publication: CreateProjectDTO): Promise<Publication> {
    const response = await api.post("/publication", publication);
    return response.data;
}

async function updatePublication(publicationId: string, publication: UpdateProjectDTO): Promise<Publication> {
    const response = await api.patch(`/publication/${publicationId}`, publication);
    return response.data;
}

async function getLandingPublications(): Promise<LandPublication[]> {
    const { data } = await api.get("/publication/landing");
    return data as LandPublication[];
}

async function getRelatedPublications(): Promise<RelatedPublication[]> {
    const { data } = await api.get("/publication/related");
    return data as RelatedPublication[];
}

export { 
    getPublicationById,
    getSortedPublications,
    getSortedPublicationsByTags,
    createPublication,
    updatePublication,
    getLandingPublications,
    getRelatedPublications
}