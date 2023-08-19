import { api, authenticatedApi } from "../api/api";
import { ComplaintDTO } from "./dtos/ComplaintDTO";

async function createComplaint(complaint: ComplaintDTO): Promise<void> {
    const { data } = await authenticatedApi.post(`/denuncia`, complaint);
}

export {
    createComplaint
}