import DefaultImage from '../DefaultImage';
import styles from './UserActivity.module.css';
import DefaultUserImage from '../../assets/default-user.png';
import { getCommentDateTime } from '../../utils/CommentDateUtil';
import ActivityDTO from '../../services/dtos/ActivityDTO';

interface UserActivityProps {
    activityDto: ActivityDTO;
}

export default function UserActivity({activityDto}: UserActivityProps) {
    return (
        <div className={styles.container}>
            <div className={styles.userinfo}>
                <DefaultImage 
                    alt=''
                    src={activityDto.authorPhoto}
                    defaultImage={DefaultUserImage}
                />
                <span>{activityDto.authorName}</span>
            </div>
            <span className={styles.type}>{activityDto.activityType === "COMMENT" ? "comentou" : "curtiu"} sua publicação</span>
            <span className={styles.text}>{activityDto.text}</span>
            <span className={styles.date}>{getCommentDateTime(activityDto.createdDate)}</span>
        </div>
    )
}