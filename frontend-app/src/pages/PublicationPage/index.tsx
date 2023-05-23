import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import TopBar from "../../components/TopBar";
import Publication from "../../models/Publication";
import { formatDateTimestamp } from "../../utils/DateUtil";

import styles from './PublicationPage.module.css';

import UserIcon from '../../assets/user_icon.svg';
import EyeIcon from '../../assets/eye_icon_filled.svg';
import HeartIcon from '../../assets/heart_icon.svg';
import CommentIcon from '../../assets/comment_icon_filled.svg';

import ImageSvg from "../../components/ImageSvg";

import colors from  '../../styles/colorsConfig.json';
import { convertNumberToThousands } from "../../utils/NumberFormat";

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
                            <ImageSvg path={UserIcon} alt="Author Image" backgroundColor={colors.theme.primary} />
                            <p className={styles.author}>{publication?.author}</p>
                        </div>
                        <p className={styles.editDate}>{formatDateTimestamp(publication?.date!!)}</p>
                    </div>
                    <div className={styles.reactionsData}>
                        <ImageSvg path={EyeIcon} alt="Author Image" backgroundColor={colors.theme["dark-gray"]} style={{width: '1rem', height: 'auto'}} />
                        <p>{convertNumberToThousands(publication?.visualizationsCount)}</p>
                        <ImageSvg path={HeartIcon} alt="Author Image" backgroundColor={colors.theme["dark-gray"]} style={{width: '1rem', height: 'auto'}} />
                        <p>{convertNumberToThousands(publication?.heartsCount)}</p>
                        <ImageSvg path={CommentIcon} alt="Author Image" backgroundColor={colors.theme["dark-gray"]} style={{width: '1rem', height: 'auto'}} />
                        <p>{convertNumberToThousands(publication?.commentsCount)}</p>
                    </div>
                    <div className={styles.publicationContent}>
                        <div className={styles.tagsContainer}>
                            {publication?.tags.map(tag => <p key={tag}>{tag}</p>)}
                        </div>
                        <p>{publication?.content}</p>
                    </div>
                    <div className={styles.relatedPublications}></div>
                    <div className={styles.makeCommentContainer}>make-comment</div>
                    <div className={styles.commentContainer}>
                        {publication?.comments.map(comment => {
                            return (
                                <div key={comment.id}>
                                    <p>{comment.author}</p>
                                    <p>{comment.content}</p>
                                    <p>{comment.date}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicationPage;