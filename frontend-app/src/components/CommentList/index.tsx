import { useEffect, useState } from "react";
import PublicationComment from "../../models/PublicationComment";
import Comment from "../Comment"

import styles from './CommentList.module.css';

import colors from "../../styles/colorsConfig.json";
import { PulseLoader } from "react-spinners";
import { getCommentsByPublicationId } from "../../services/CommentService";
import { dateComparator } from "../../utils/DateUtil";

interface CommentListProps {
    publicationId?: string;
    commentCreated: boolean;
}

function CommentList({ publicationId, commentCreated }: CommentListProps) {
    const [comments, setComments] = useState<PublicationComment[]>([]);
    const [loading, setLoading] = useState(true);

    async function loadComments() {
        if (publicationId) {
            const result = await getCommentsByPublicationId(publicationId);
            setComments(result);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadComments();
    }, [commentCreated]);

    function handleOnDeleteComment(commentId: string) {
        setComments(comments.filter(c => c.c_id !== commentId));
    }

    return (
        <>
            {
                loading ? (
                    <PulseLoader color={colors.theme.secondary} />
                ) : (
                    comments.length === 0 ? (
                        <span>Ainda não há comentários</span>
                    ) : (
                        comments.sort((c1,c2) => dateComparator(c1.creation_date, c2.creation_date, true)).map((comment, index) => {
                            return (
                                <Comment 
                                    key={comment.c_id} 
                                    comment={comment}
                                    onDeleteComment={handleOnDeleteComment}
                                />
                            );
                        })
                    )
                )
            }
        </>
    );
}

export default CommentList;