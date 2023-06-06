import { api } from "../api/api";
import UserDTO from "./dtos/UserDTO";

async function createUser(userDTO: UserDTO): Promise<UserDTO> {
    const { data } = await api.post("/user", userDTO);
    return data as UserDTO;
}

async function getUserById(userId: string): Promise<UserDTO> {
    const { data } = await api.get(`/user/${userId}`);
    return data as UserDTO;
}

async function getAllUsers(): Promise<UserDTO[]> {
    const { data } = (await api.get("/user"));
    return data as UserDTO[];
}

export default {
    createUser,
    getUserById,
    getAllUsers
}