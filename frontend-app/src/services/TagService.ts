import { api } from "../api/api";
import CreateTagDTO from "./dtos/CreateTagDTO";
import TagDTO from "./dtos/TagDTO";

async function getAllTags(): Promise<TagDTO[]> {
    const { data } = (await api.get("/tag"));
    return data as TagDTO[];
}

async function createTag(tag: CreateTagDTO): Promise<TagDTO> {
    const { data } = await api.post("/tag", tag);
    return data as TagDTO;
}

export {
    getAllTags,
    createTag
}