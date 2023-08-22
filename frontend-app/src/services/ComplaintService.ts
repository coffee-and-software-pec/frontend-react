import { authenticatedApi } from "../api/api";
import { ComplaintDTO } from "./dtos/ComplaintDTO";

async function createComplaint(complaint: ComplaintDTO): Promise<void> {
    await authenticatedApi.post(`/denuncia`, complaint);
}

async function hasComplaintGet(userId: string, publicationId: string): Promise<boolean> {
    const { data } = await authenticatedApi.get(`/denuncia/${userId}/${publicationId}`);
    return data as boolean;
}

export {
    createComplaint,
    hasComplaintGet
}