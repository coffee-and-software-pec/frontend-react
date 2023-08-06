import DefaultImage from '../DefaultImage';
import styles from './UserInfo.module.css';

import DefaultImageUser from "../../assets/default-user.png";
import UserStats from '../../models/UserStats';
import { useState } from 'react';
import { convertNumberToThousands } from '../../utils/NumberFormat';

interface UserInfoProps {
    user: UserStats;
}

export default function UserInfo({ user }: UserInfoProps) {
    const [internalUser, setInternalUser] = useState(user);

    function handleFollowClick() {
        setInternalUser({
            ...internalUser,
            isFollowing: !internalUser.isFollowing
        });
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
                    className={internalUser.isFollowing ? styles.disabled : ""}
                    onClick={handleFollowClick}
                >
                    {internalUser.isFollowing ? "SEGUINDO" : "SEGUIR" }
                </button>
            </div>
        </div>
    );
}