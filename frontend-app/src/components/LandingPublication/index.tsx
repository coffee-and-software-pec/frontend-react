import React from "react";

import styles from "./LandingPublication.module.css";

import { ReactComponent as EyeIcon } from '../../assets/eye_icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/comment_icon.svg'
import { ReactComponent as EnterPublication } from '../../assets/enter_publication_icon.svg';

import { Link } from "react-router-dom";
import LandPublication from "../../models/LandPublication";

interface LandingPublicationProps {
    publication: LandPublication
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
                            <span key={tag} className={styles.tagSpan}>{tag}</span>
                        ))
                    }
                </div>
            </div>
            <div className={styles.publicationReactions}>
                <div className={styles.publicationVisualizations}>
                    <EyeIcon />
                    {publication.visualizationsCount}
                </div>
                <div className={styles.publicationCommentsCount}>
                    <CommentIcon />
                    {publication.commentsCount}
                </div>
                <Link to={`/publication/${publication.id}`} className={styles.enterPublicationIcon}>
                    <EnterPublication className={styles.enterPublicationIcon} />
                </Link>
            </div>
        </div>
    );
}

export default LandingPublication;