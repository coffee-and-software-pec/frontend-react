import React from "react";
import Publication from "../../models/Publication";

import styles from "./LandingPublication.module.css";

import EyeIcon from '../../assets/eye_icon.svg';
import CommentIcon from '../../assets/comment_icon.svg'
import EnterPublication from '../../assets/enter_publication_icon.svg';
import { Link } from "react-router-dom";

interface LandingPublicationProps {
    publication: Publication
}

function LandingPublication({publication}: LandingPublicationProps) {
    return (
        <div className={styles.publicationContainer}>
            <img src={publication.userPhoto} alt="Publication's user photo" referrerPolicy="no-referrer" />
            <div className={styles.publicationInfo}>
                <p>{publication.title}</p>
                <div className={styles.publicationTagList}>
                    {
                        publication.tags.map((tag) => (
                            <span className={styles.tagSpan}>{tag}</span>
                        ))
                    }
                </div>
            </div>
            <div className={styles.publicationReactions}>
                <div className={styles.publicationVisualizations}>
                    <img src={EyeIcon} alt="" />
                    {publication.visualizationsCount}
                </div>
                <div className={styles.publicationCommentsCount}>
                    <img src={CommentIcon} alt="" />
                    {publication.commentsCount}
                </div>
                <Link to={`/publication/${publication.id}`} className={styles.enterPublicationIcon}>
                    <img src={EnterPublication} style={{opacity: '0'}} />
                </Link>
            </div>
        </div>
    );
}

export default LandingPublication;