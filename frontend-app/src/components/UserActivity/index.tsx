import DefaultImage from '../DefaultImage';
import styles from './UserActivity.module.css';
import DefaultUserImage from '../../assets/default-user.png';
import { getCommentDateTime } from '../../utils/CommentDateUtil';

export interface UserActivityModel {
    author_image: string;
    author_name: string;
    activity_type: "COMMENT" | "LIKE";
    activity_text?: string;
    activity_date: string;
}

interface UserActivityProps {
    userActivityModel: UserActivityModel;
}

export default function UserActivity({userActivityModel}: UserActivityProps) {
    return (
        <div className={styles.container}>
            <div className={styles.userinfo}>
                <DefaultImage 
                    alt=''
                    src={userActivityModel.author_image}
                    defaultImage={DefaultUserImage}
                />
                <span>{userActivityModel.author_name}</span>
            </div>
            <span className={styles.type}>{userActivityModel.activity_type === "COMMENT" ? "comentou" : "curtiu"} sua publicação</span>
            <span className={styles.text}>{userActivityModel.activity_text}</span>
            <span className={styles.date}>{getCommentDateTime(userActivityModel.activity_date)}</span>
        </div>
    )
}