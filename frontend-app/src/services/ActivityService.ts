import { api } from "../api/api";
import ActivityDTO from "./dtos/ActivityDTO";

async function getActivitByUserId(userId: string): Promise<ActivityDTO[]> {
    const { data } = await api.get(`/activity/${userId}`);
    return data as ActivityDTO[];
}

export {
    getActivitByUserId
}