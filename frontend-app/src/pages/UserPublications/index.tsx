import { useEffect, useRef, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { api } from '../../api/api';
import SelectTagBox from '../../components/SelectTagBox';
import TopBar from '../../components/TopBar';
import Publication from '../../models/Publication';
import { getSortedPublicationsByTags, getUserPublications, getUserPublicationsByTags } from '../../services/PublicationService';
import styles from './UserPublications.module.css';

import colors from '../../styles/colorsConfig.json';
import HomePagePublication from '../../components/HomePagePublication';

import { ReactComponent as AddIcon } from '../../assets/plus_icon.svg';
import { Link } from 'react-router-dom';
import UserPublication from '../../components/UserPublication';
import { useAuth } from '../../contexts/AuthContext';

function UserPublications() {
    const { user, loadUser } = useAuth();

    const [publications, setPublications] = useState<Publication[]>([]);
    const publicationsNumber = 4;
    const [next, setNext] = useState<number>(publicationsNumber);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadedUser = loadUser();

        async function fetchPublications() {
            const result = await getUserPublications(loadedUser.id!!);
            setPublications(result);
            setLoading(false);
        }
        
        fetchPublications();
    }, []);

    const handleMorePublications = () => {
        setNext(next + publicationsNumber);
    }

    async function handleOnClickFilterButton(tags: string[]) {
        embraceWithLoading(async () => {
            const newPublications = await getUserPublicationsByTags(user?.id!!, tags);
            setPublications([...newPublications]);
        });
        
    }

    function embraceWithLoading(callback: () => void) {
        setLoading(true);
        callback();
        setTimeout(() => {setLoading(false);}, 500);
    }

    function handleOnDeletePublication(publicationId: string) {
        embraceWithLoading(() => {
            setPublications(publications.filter(p => p.p_id.toString() !== publicationId)) 
        });
    }

    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.mainContent}>
                <div className={styles.selectTagContainer}>
                    <SelectTagBox onClickFilterButton={handleOnClickFilterButton} />
                </div>
                <div className={styles.publicationsContainer}>
                    <h1>Suas publicações</h1>
                    {loading ? (
                        <PulseLoader color={colors.theme.secondary} />
                    ) : (
                        publications.length === 0 ? (
                            <span className={styles.noPublications}>Não há publicações</span>
                        ) : (
                            <>
                                {publications?.slice(0, next)?.map((publication, index) => {
                                    return (
                                        <UserPublication 
                                            key={index} 
                                            publication={publication}
                                            onDelete={handleOnDeletePublication}
                                        />
                                    );
                                })}
                                {next < publications?.length && (
                                    <span className={styles.loadMore} onClick={handleMorePublications}
                                        >carregar mais publicações</span>
                                )}
                            </>
                        )
                    )}
                    
                    
                </div>
                <div className={styles.createButtonContainer}>
                    <AddIcon height={24} width={24} fill={colors.theme.white} />
                    <Link to={"/publicacao"} className={styles.createButtonLink}>CRIAR PUBLICAÇÃO</Link>
                </div>
            </div>
        </div>
    );
}

export  default UserPublications;