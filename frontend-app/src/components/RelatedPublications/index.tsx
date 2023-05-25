import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { RelatedPublication } from '../../models/RelatedPublication';
import styles from './RelatedPublications.module.css';



function RelatedPublications() {
    const [relatedPublications, setRelatedPublications] = useState<RelatedPublication[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getRelatedPublications() {
            const result = (await api.get("/relatedPublications")).data
            setRelatedPublications(result as RelatedPublication[])
        }

        getRelatedPublications();
    }, [])

    function onClickRelatedPublication(relatedPublication: RelatedPublication) {
        navigate(`/publication/${relatedPublication.id}`)
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