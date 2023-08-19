import { api, authenticatedApi } from "../api/api";
import UserStats from "../models/UserStats";
import UserDTO from "./dtos/UserDTO";

async function createUser(userDTO: UserDTO): Promise<UserDTO> {
    const response = await api.post("/user", userDTO);
    if (response.status === 201) {
        return response.data as UserDTO;
    }
    throw new Error("error in registration");
}

async function getUserById(userId: string): Promise<UserDTO> {
    const { data } = await authenticatedApi.get(`/user/${userId}`);
    return data as UserDTO;
}

async function getUserByEmail(email: string): Promise<UserDTO> {
    const response = await api.get(`/user/getByEmail/${email}`);
    if (response.status === 200) {
        return response.data as UserDTO;
    }
    throw new Error("error while get user by email");
}

async function getAllUsers(): Promise<UserDTO[]> {
    const { data } = (await authenticatedApi.get("/user"));
    return data as UserDTO[];
}

async function getUserStatsById(userId: string, requestUserId: string): Promise<UserStats> {
    const { data } = await authenticatedApi.get(`/user/stats/${userId}/${requestUserId}`);
    return data as UserStats;
}

async function getUserStats(requestUserId: string): Promise<UserStats[]> {
    const { data } = await authenticatedApi.get(`/user/stats/${requestUserId}`);
    return data as UserStats[];
}

async function updateUser(userId: string, userDto: UserDTO): Promise<UserDTO> {
    const { data } = await authenticatedApi.patch(`/user/${userId}`, userDto);
    return data as UserDTO;
}

async function followUser(userId: string, followerId: string) {
    await authenticatedApi.post("/user/addFollower", {
        id: userId,
        followerId: followerId
    });
}

async function unfollowUser(userId: string, followerId: string) {
    await authenticatedApi.patch("/user/removeFollower", {
        id: userId,
        followerId: followerId
    });
}

export {
    createUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    getUserStatsById,
    getUserStats,
    updateUser,
    followUser,
    unfollowUser
}