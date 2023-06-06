import { useEffect, useRef, useState } from "react";
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
import RelatedPublications from "../../components/RelatedPublications";
import { createComment } from "../../services/CommentService";
import { useAuth } from "../../contexts/AuthContext";

function PublicationPage() {
    const params = useParams();
    const { user } = useAuth()
    const [publicationId, setPublicationId] = useState<string>();
    const [publication, setPublication] = useState<Publication | undefined>(undefined);
    const [isLike, setIsLike] = useState<boolean>(false);

    const onLikeButtonClick = () => { 
        let newPublication = publication;
        if(newPublication != undefined) {
             newPublication.heartsCount += isLike ? -1 : +1;    
        }
        setPublication(newPublication);
        setIsLike(!isLike);          
    };

    const textAreaRef: any = useRef(null);

    function onClickClearButton() {
        console.log(textAreaRef.current.value);
        textAreaRef.current.value = "";
    }

    async function onClickSendButton() {
        try {
            if (publicationId !== undefined && user?.id !== undefined) {
                const result = await createComment({
                    authorId: user?.id,
                    commentText: textAreaRef.current.value
                }, publicationId);
            }
        } catch(e) {
            console.log("error on comment creation");
        }
    }

    useEffect(() => {
        async function loadPublication(publicationId: string) {
            try {
                const result = (await api.get(`/publications/${publicationId}`)).data;
                setPublication(result as Publication);
            } catch(e) {
                alert("there is no publication with this id");
            }
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
                            <p className={styles.author}>{publication?.authorData.authorName}</p>
                        </div>
                        <p className={styles.editDate}>{formatDateTimestamp(publication?.date!!)}</p>
                    </div>
                    <div className={styles.reactionsData}>
                        <EyeIcon />
                        <p>{convertNumberToThousands(publication?.visualizationsCount)}</p>
                        <HeartIcon className={isLike ? styles.liked : styles.heartIcon} onClick={onLikeButtonClick}/>
                        <p>{convertNumberToThousands(publication?.heartsCount)}</p>
                        <a href="#comments" className={styles.commentLink}>
                            <CommentIcon className={styles.commentIcon}/>
                        </a>
                        <p>{convertNumberToThousands(publication?.commentsCount)}</p>
                    </div>
                    <div className={styles.publicationContent}>
                        <div className={styles.contentContainer}>
                            <div className={styles.tagsContainer}>
                                {publication?.tags.map(tag => <Tag key={tag} name={tag} onClickTag={null}/>)}
                            </div>
                            <MarkdownPreview 
                                source={publication?.content}
                                className={styles.markdownEditor}
                                wrapperElement={{"data-color-mode": "light"}}
                            />
                        </div>
                    </div>
                    <div className={styles.relatedPublications}>
                        <h4>Artigos relacionados</h4>
                        <RelatedPublications />
                    </div>
                    <div className={styles.makeCommentContainer}>
                        <span>Faça um comentário:</span>
                        <textarea 
                            name="comment-text-area" 
                            id="comment-text-area" 
                            cols={30} 
                            rows={10}
                            placeholder="Digite seu comentário aqui"
                            ref={textAreaRef}
                        >
                        </textarea>
                        <div className={styles.buttonsContainer}>
                            <button 
                                className={styles.cancelButton}
                                onClick={onClickClearButton}
                            >
                                limpar
                            </button>
                            <button 
                                className={styles.sendButton}
                                onClick={onClickSendButton}
                            >
                                enviar
                            </button>
                        </div>
                    </div>
                    <div className={styles.commentContainer}>
                        <h4 id="comments">Comentários</h4>
                        {publication?.comments.map((comment) => {
                            return (
                                <Comment key={comment.id} comment={comment} />
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
