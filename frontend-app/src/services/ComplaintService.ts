import { api } from "../api/api";
import { ComplaintDTO } from "./dtos/ComplaintDTO";

async function createComplaint(complaint: ComplaintDTO): Promise<void> {
    const { data } = await api.post(`/denuncia`, complaint);
}

export {
    createComplaint
}