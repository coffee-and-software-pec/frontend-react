import Publication from '../../models/Publication';
import Tag from '../Tag';
import styles from './HomePagePublication.module.css';

import { ReactComponent as HeartIcon } from '../../assets/heart_icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/comment_icon_filled.svg';
import { useNavigate } from 'react-router-dom';

interface HomePagePublicationProps {
    publication: Publication;
}

function HomePagePublication({ publication }: HomePagePublicationProps) {

    const nav = useNavigate();

    function handleOnClickPublication() {
        nav(`/publicacao/${publication.p_id}`);
    }

    return (
        <div className={styles.container} onClick={handleOnClickPublication}>
            <div className={styles.mainContent}>
                <div className={styles.publicationContainer}>
                    <p className={styles.title}>{publication.title}</p>
                    <p className={styles.subtitle}>{publication.subtitle}</p>
                    <div className={styles.tagContainer}>
                        {publication.tags.map((tag, index) => {
                            return (
                                <Tag key={index} name={tag.title} />
                            )
                        })}
                    </div>
                    <div className={styles.authorContainer}>
                        escrito por:
                        <img 
                            src={publication.author.photoURL} 
                            alt="" 
                            width={16} 
                            height={16} 
                            referrerPolicy="no-referrer" 
                        />
                        <p>{publication.author.u_name}</p>
                    </div>
                </div>
                <img className={styles.thumbnail} src={publication.main_img_url} alt="" referrerPolicy="no-referrer"/>
            </div>
            <div className={styles.reactionsContainer}>
                <div className={styles.reactionContainer}>
                    <HeartIcon />
                    <p>{publication.heartsCount}</p>
                </div>
                <div className={styles.reactionContainer}>
                    <CommentIcon />
                    <p>{publication.commentsCount}</p>
                </div>
                
            </div>
        </div>
    );
}

export default HomePagePublication;