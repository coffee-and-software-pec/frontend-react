import PublicationComment from '../../models/PublicationComment';
import { getCommentDateString, getCommentDateTime } from '../../utils/CommentDateUtil';
import DefaultImage from '../DefaultImage';
import styles from './Comment.module.css';

import DefaultImageUser from "../../assets/default-user.png";

interface CommentProps {
    comment: PublicationComment
}

function Comment({ comment }: CommentProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.authorContainer}>
                    {/* <img src={comment.author.photoURL} alt="" referrerPolicy='no-referrer' /> */}
                    <DefaultImage 
                        src={comment.author.photoURL} 
                        alt=""
                        defaultImage={DefaultImageUser}
                    />
                    <p>{comment.author.u_name}</p>
                </div>
                <span className={styles.commentDate}>
                    {getCommentDateTime(comment.creation_date)}
                </span>
            </div>
            <div className={styles.content}>
                {comment.c_text}
            </div>
        </div>
    );
}

export default Comment;