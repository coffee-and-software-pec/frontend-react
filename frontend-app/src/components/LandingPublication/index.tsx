import React from "react";

import styles from "./LandingPublication.module.css";

import { ReactComponent as HeartIcon } from '../../assets/heart_icon.svg';
import { ReactComponent as CommentIcon } from '../../assets/comment_icon.svg'
import { ReactComponent as EnterPublication } from '../../assets/enter_publication_icon.svg';

import { Link } from "react-router-dom";
import LandPublication from "../../models/LandPublication";
import Tag from "../Tag";
import Publication from "../../models/Publication";
import DefaultImage from "../DefaultImage";

interface LandingPublicationProps {
    publication: Publication
}

function LandingPublication({publication}: LandingPublicationProps) {
    return (
        <div className={styles.publicationContainer}>
            <DefaultImage 
                src={publication.author.photoURL} 
                alt="Publication's user photo"
            />
            <div className={styles.publicationInfo}>
                <p>{publication.title}</p>
                <div className={styles.publicationTagList}>
                    {
                        publication.tags.map((tag, index) => (
                            <Tag key={index} name={tag.title} />
                        ))
                    }
                </div>
            </div>
            <div className={styles.publicationReactions}>
                <div className={styles.publicationVisualizations}>
                    <HeartIcon />
                    {publication.heartsCount}
                </div>
                <div className={styles.publicationCommentsCount}>
                    <CommentIcon />
                    {publication.commentsCount}
                </div>
                <Link to={`/publicacao/${publication.p_id}`} className={styles.enterPublicationIcon}>
                    <EnterPublication className={styles.enterPublicationIcon} />
                </Link>
            </div>
        </div>
    );
}

export default LandingPublication;