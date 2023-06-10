import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { RelatedPublication } from '../../models/RelatedPublication';
import { getLandingPublications, getSortedPublications } from '../../services/PublicationService';
import styles from './RelatedPublications.module.css';



function RelatedPublications() {
    const [relatedPublications, setRelatedPublications] = useState<RelatedPublication[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getRelatedPublications() {
            // const result = (await api.get("/relatedPublications")).data
            const result = await getSortedPublications();
            const landingPublications = result.map((p) => ({
                id: p.p_id,
                title: p.title,
                subtitle: p.subtitle,
                publicationThumb: p.main_img_url
            }));
            setRelatedPublications(landingPublications);
        }

        getRelatedPublications();
    }, [])

    function onClickRelatedPublication(relatedPublication: RelatedPublication) {
        navigate(`/publicacao/${relatedPublication.id}`)
    }

    return (
        <div className={styles.container}>
            {
                relatedPublications.map(relatedPublication => (
                    <div key={relatedPublication.id} className={styles.publicationContainer} onClick={() => onClickRelatedPublication(relatedPublication)}>
                        <div className={styles.publicationContent}>
                            <p className={styles.title}>{relatedPublication.title}</p>
                            <p className={styles.subtitle}>{relatedPublication.subtitle}</p>
                        </div>
                        <img src={relatedPublication.publicationThumb} alt="" />
                    </div>
                ))
            }
        </div>
    );
}

export default RelatedPublications;