interface UserStats {
    id?: string;
    email: string;
    name: string;
    photoURL: string;
    followersCount: number;
    followingCount?: number;
    posts: number;
    likes?: number;
    comments?: number;
    bio: string;
    following: boolean
}

export default UserStats;