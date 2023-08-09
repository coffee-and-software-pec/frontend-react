import DefaultImage from '../DefaultImage';
import styles from './UserInfo.module.css';

import DefaultImageUser from "../../assets/default-user.png";
import UserStats from '../../models/UserStats';
import { useState } from 'react';
import { convertNumberToThousands } from '../../utils/NumberFormat';
import { followUser, unfollowUser } from '../../services/UserService';
import { useAuth } from '../../contexts/AuthContext';

interface UserInfoProps {
    user: UserStats;
}

export default function UserInfo({ user }: UserInfoProps) {
    const { loadUser } = useAuth();
    const [internalUser, setInternalUser] = useState(user);

    async function handleFollowClick() {
        try {
            const loadedUser = loadUser();

            if (internalUser.following) {
                const _ = await unfollowUser(loadedUser?.id!!, user.id!!);
            } else {
                const _ = await followUser(loadedUser?.id!!, user.id!!);
            }
            
            setInternalUser({
                ...internalUser,
                following: !internalUser.following
            });
        } catch(_) {}
        
    }    

    return (
        <div className={styles.container}>
            <DefaultImage 
                alt=''
                src={internalUser.photoURL}
                defaultImage={DefaultImageUser}
                className={styles.userImage}
            />
            <div className={styles.username}>
                {internalUser.name}
            </div>
            <div className={styles.userbio}>
                <p>{internalUser.bio}</p>
            </div>
            <div className={styles.stats}>
                <span>{convertNumberToThousands(internalUser.followersCount)} seguidores</span>
                <span>{internalUser.posts} posts</span>
            </div>
            <div className={styles.button}>
                <button 
                    className={internalUser.following ? styles.disabled : ""}
                    onClick={handleFollowClick}
                >
                    {internalUser.following ? "SEGUINDO" : "SEGUIR" }
                </button>
            </div>
        </div>
    );
}