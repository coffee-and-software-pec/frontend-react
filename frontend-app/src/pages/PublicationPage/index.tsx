import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api/api";
import TopBar from "../../components/TopBar";
import Publication from "../../models/Publication";
import { formatDateTimestamp, formatLocalDateTime } from "../../utils/DateUtil";

import styles from './PublicationPage.module.css';

import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye_icon_filled.svg';
import { ReactComponent as HeartIcon } from '../../assets/heart_icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/comment_icon_filled.svg';
import { ReactComponent as FlagIcon } from '../../assets/flag.svg';

import colors from  '../../styles/colorsConfig.json';
import { convertNumberToThousands } from "../../utils/NumberFormat";
import Tag from "../../components/Tag";
import MarkdownEditor from "@uiw/react-markdown-editor";
import MarkdownPreview from '@uiw/react-markdown-preview';
import Comment from "../../components/Comment";
import RelatedPublications from "../../components/RelatedPublications";
import { createComment } from "../../services/CommentService";
import { useAuth } from "../../contexts/AuthContext";
import { getPublicationById } from "../../services/PublicationService";
import { createLikePublication, hasLikedPublication, removeLikePublication } from "../../services/ReactionService";
import User from "../../models/User";
import DefaultImage from "../../components/DefaultImage";
import DefaultUserImage from '../../assets/default-user.png';

import CommentList from "../../components/CommentList";
import { toast, TypeOptions } from "react-toastify";
import { BeatLoader, ClipLoader } from "react-spinners";
import { embraceWithLoading, embraceWithLoadingThen } from "../../utils/LoadingUtil";

function PublicationPage() {
    const navigate = useNavigate();
    const params = useParams();
    const { user, loadUser } = useAuth()
    const [publicationId, setPublicationId] = useState<string>();
    const [publication, setPublication] = useState<Publication | undefined>(undefined);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(false);

    const [commentText, setCommentText] = useState("");
    const [commentCreated, setCommentCreated] = useState<boolean>(false);


    const onLikeButtonClick = async () => { 
        let newPublication = publication;
        if(newPublication != undefined) {
             newPublication.heartsCount += isLike ? -1 : +1;    
        }
        setPublication(newPublication);
        if (!isLike) {
            createLikeReactionOnClick();
        } else {
            removeLikeReactionOnClick();
        }
        setIsLike(!isLike);
    };

    async function createLikeReactionOnClick() {
        if (publicationId != undefined && user?.email != undefined) {
            await createLikePublication(publicationId, {
                authorEmail: user.email,
                type: "LIKE"
            });
        }
        
    }

    async function removeLikeReactionOnClick() {
        if (publicationId != undefined && user?.email != undefined) {
            await removeLikePublication(publicationId, {
                authorEmail: user.email,
                type: "LIKE"
            });
        }
    }

    const textAreaRef: any = useRef(null);

    function onClickClearButton() {
        textAreaRef.current.value = "";
    }

    async function onClickSendButton() {
        if (getSendButtonDisabled(commentText, isSendButtonDisabled)) {
            toast.warning("Preencha o campo de comentário com no mínimo 3 caracteres");
            return;
        }

        try {
            if (publicationId !== undefined && user?.id !== undefined) {
                embraceWithLoadingThen(setIsSendButtonDisabled, async () => {
                    const result = await createComment({
                        author_id: user?.id!!,
                        c_text: commentText,
                        publication_id: publicationId
                    });
                }, 1000, () => {
                    textAreaRef.current.value = "";
                    setCommentText("");
                    setCommentCreated(!commentCreated);
                });
            }
        } catch(e) {
            toast.error("Houve algum erro no cadastro de comentário!");
            setIsSendButtonDisabled(false);
        }
    }

    function getSendButtonDisabled(commentText: string, isSendButtonDisabled: boolean) {
        return commentText.length < 3 || isSendButtonDisabled;
    }

    useEffect(() => {

        async function loadPublication(publicationId: string) {
            try {
                const result = await getPublicationById(publicationId);
                setPublication(result as Publication);
            } catch(e) {
                alert("there is no publication with this id");
                navigate("/home");
            }
        }

        async function loadLike(loadedUser: User, publicationId?: string) {
            if (loadedUser.email !== undefined && publicationId !== undefined) {
                const response = await hasLikedPublication(publicationId, {
                    authorEmail: loadedUser.email,
                    type: "LIKE"
                });
                setIsLike(response.data);
            }
        }

        if (params.id !== undefined) {
            const loadedUser = loadUser();
            setPublicationId(params.id);
            loadPublication(params.id);
            loadLike(loadedUser, params.id);
        }

        
    }, [params.id]);   
    
    function handleComplaintButton() {
        
    }


    return (
        <div className={styles.outsideContainer}>
            <TopBar />
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    <div className={styles.publicationData}>
                        <div className={styles.titlesContainer}>
                            <h1>{publication?.title}</h1>
                            <h2>{publication?.subtitle}</h2>
                        </div>
                        <div className={styles.authorContainer}>
                            <DefaultImage 
                                src={publication?.author.photoURL!!} 
                                alt=""
                                defaultImage={DefaultUserImage}
                            />
                            <p className={styles.author}>{publication?.author.u_name}</p>
                        </div>
                        <p className={styles.editDate}>{formatLocalDateTime(publication?.creation_date!!)}</p>
                    </div>
                    <div className={styles.reactionsData}>
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
                                {publication?.tags.map((tag, index) => <Tag key={index} name={tag.title} onClickTag={null}/>)}
                                <div className={styles.denunciarButton}
                                    onClick={handleComplaintButton}
                                >
                                    <FlagIcon className={styles.flagIcon}/>
                                    <span>Denunciar</span>
                                </div>
                            </div>
                            
                            <MarkdownPreview 
                                source={publication?.continuous_text}
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
                            onChange={(e) => setCommentText(e.target.value)}
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
                                disabled={getSendButtonDisabled(commentText, isSendButtonDisabled)}
                            >
                                <ClipLoader 
                                    color={colors.theme.secondary}
                                    cssOverride={{ mixBlendMode: 'screen' }}
                                    loading={isSendButtonDisabled} 
                                    size={16}
                                />
                                {isSendButtonDisabled ? "enviando" : "enviar"}
                            </button>
                        </div>
                    </div>
                    <div className={styles.commentContainer}>
                        <h4 id="comments">Comentários</h4>
                        <CommentList 
                            publicationId={params.id} 
                            commentCreated={commentCreated}
                        />
                    </div>
                    <div className={styles.space}></div>
                </div>
            </div>
        </div>
    );
}

export default PublicationPage;
