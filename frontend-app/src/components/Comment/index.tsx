import PublicationComment from '../../models/PublicationComment';
import { getCommentDateString } from '../../utils/CommentDateUtil';
import styles from './Comment.module.css';

interface CommentProps {
    comment: PublicationComment
}

function Comment({ comment }: CommentProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.authorContainer}>
                    <img src={comment.authorPhoto} alt="" referrerPolicy='no-referrer' />
                    <p>{comment.author}</p>
                </div>
                <span className={styles.commentDate}>
                    {getCommentDateString(comment.date)}
                </span>
            </div>
            <div className={styles.content}>
                {comment.content}
            </div>
        </div>
    );
}

export default Comment;