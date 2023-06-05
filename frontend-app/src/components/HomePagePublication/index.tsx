import Publication from '../../models/Publication';
import Tag from '../Tag';
import styles from './HomePagePublication.module.css';

import { ReactComponent as HeartIcon } from '../../assets/heart_icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/comment_icon_filled.svg';

interface HomePagePublicationProps {
    publication: Publication;
}

function HomePagePublication({ publication }: HomePagePublicationProps) {
    return (
        <div className={styles.container}>
            <div className={styles.mainContent}>
                <div className={styles.publicationContainer}>
                    <p className={styles.title}>{publication.title}</p>
                    <p className={styles.subtitle}>{publication.subtitle}</p>
                    <div className={styles.tagContainer}>
                        {publication.tags.map(tag => {
                            return (
                                <Tag key={tag} name={tag} />
                            )
                        })}
                    </div>
                    <div className={styles.authorContainer}>
                        escrito por:
                        <img src={publication.authorData.authorPhoto} alt="" width={16} height={16} />
                        <p>{publication.authorData.authorName}</p>
                    </div>
                </div>
                <img className={styles.thumbnail} src={publication.thumbnail} alt="" />
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