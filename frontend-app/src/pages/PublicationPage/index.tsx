import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import TopBar from "../../components/TopBar";
import Publication from "../../models/Publication";
import { formatDateTimestamp } from "../../utils/DateUtil";

import styles from './PublicationPage.module.css';

import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye_icon_filled.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart_icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/comment_icon_filled.svg';

import colors from  '../../styles/colorsConfig.json';
import { convertNumberToThousands } from "../../utils/NumberFormat";
import Tag from "../../components/Tag";
import MarkdownEditor from "@uiw/react-markdown-editor";
import MarkdownPreview from '@uiw/react-markdown-preview';
import Comment from "../../components/Comment";

function PublicationPage() {
    const params = useParams();
    const [publicationId, setPublicationId] = useState<string>();
    const [publication, setPublication] = useState<Publication | undefined>(undefined);

    useEffect(() => {
        async function loadPublication(publicationId: string) {
            const result = (await api.get(`/publications/${publicationId}`)).data;
            setPublication(result as Publication);
        }

        if (params.id !== undefined) {
            setPublicationId(params.id);
            loadPublication(params.id);
        }
    }, [params.id]);
    

    return (
        <div className={styles.outsideContainer}>
            <TopBar />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.publicationData}>
                        <div className={styles.authorContainer}>
                            <UserIcon color={colors.theme["soft-black"]} width={24} height={24} />
                            <p className={styles.author}>{publication?.author}</p>
                        </div>
                        <p className={styles.editDate}>{formatDateTimestamp(publication?.date!!)}</p>
                    </div>
                    <div className={styles.reactionsData}>
                        <EyeIcon />
                        <p>{convertNumberToThousands(publication?.visualizationsCount)}</p>
                        <HeartIcon />
                        <p>{convertNumberToThousands(publication?.heartsCount)}</p>
                        <CommentIcon />
                        <p>{convertNumberToThousands(publication?.commentsCount)}</p>
                    </div>
                    <div className={styles.tagsContainer}>
                        {publication?.tags.map(tag => <Tag key={tag} name={tag} />)}
                    </div>
                    <div className={styles.publicationContent}>
                        <div className={styles.contentContainer}>
                            <MarkdownPreview 
                                source={publication?.content}
                                className={styles.markdownEditor}
                            />
                        </div>
                    </div>
                    <div className={styles.relatedPublications}></div>
                    <div className={styles.makeCommentContainer}>
                        <span>Faça um comentário:</span>
                        <textarea 
                            name="comment-text-area" 
                            id="comment-text-area" 
                            cols={30} 
                            rows={10}
                        >
                        </textarea>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.cancelButton}>cancelar</button>
                            <button className={styles.sendButton}>enviar</button>
                        </div>
                    </div>
                    <div className={styles.commentContainer}>
                        <h4>Comentários</h4>
                        {publication?.comments.map((comment) => {
                            return (
                                <Comment comment={comment} />
                            );
                        })}
                    </div>
                    <div className={styles.space}></div>
                </div>
            </div>
        </div>
    );
}

export default PublicationPage;