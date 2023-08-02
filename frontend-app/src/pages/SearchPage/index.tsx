import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import HomePagePublication from '../../components/HomePagePublication';
import SelectTagBox from '../../components/SelectTagBox';
import TopBar from '../../components/TopBar';
import Publication from '../../models/Publication';
import { getPublicationsBySearchText, getSortedPublicationsByTags, getTrendingPublications } from '../../services/PublicationService';
import { embraceWithLoading } from '../../utils/LoadingUtil';
import styles from './SearchPage.module.css';

import colors from "../../styles/colorsConfig.json";

import { ReactComponent as AddIcon } from '../../assets/plus_icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg';

import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SearchPage() {
    const { loadUser } = useAuth();
    const navigate = useNavigate();

    const [publications, setPublications] = useState<Publication[]>([]);

    const [loading, setLoading] = useState(true);

    const publicationsNumber = 4;
    const [next, setNext] = useState<number>(publicationsNumber);

    const [searchInputText, setSearchInputText] = useState('');

    const [emptyPublicationText, setEmptyPublicationText] = useState("Pesquise por termos para aparecer publicações aqui");

    async function handleOnClickFilterButton(tags: string[]) {
        embraceWithLoading(setLoading, async () => {
            const newPublications = await getSortedPublicationsByTags(tags);
            setPublications([...newPublications]);
        }, 500);
    }

    const handleMorePublications = () => {
        setNext(next + publicationsNumber);
    }

    function handleCreatePublicationButton() {
        if (loadUser() === undefined) {
            toast("Você precisa estar logado para criar publicações!", {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: false,
                theme: "light",
                type: "info",
                position: "top-right"
            });
        } else {
            navigate("/publicacao");
        }
    }

    function handleOnClickSearchButton() {
        embraceWithLoading(setLoading, async () => {
            const newPublications = await getPublicationsBySearchText(searchInputText);
            setPublications([...newPublications]);
            if (newPublications.length === 0) {
                setEmptyPublicationText('Não há publicações com estes termos');
            }
        }, 500);
    }

    useEffect(() => {
        async function fetchPublications() {
            embraceWithLoading(setLoading, async () => {
                const result: Publication[] = [];
                const publicationList = result as Publication[];
                if (publicationList.length > 0) {
                    setPublications(result);
                }
            }, 1000);
        }
        
        fetchPublications();
    }, []);

    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.mainContent}>
                <div className={styles.selectTagContainer}>
                    <SelectTagBox onClickFilterButton={handleOnClickFilterButton} />
                </div>
                <div className={styles.searchBarContainer}>
                    <input 
                        type="text" 
                        placeholder='busque por termos parecidos'
                        value={searchInputText}
                        onChange={e => setSearchInputText(e.target.value)}
                    />
                    <div className={styles.searchButton} onClick={handleOnClickSearchButton}>
                        <SearchIcon width={28} height={28} />
                    </div>
                </div>
                <div className={styles.publicationsContainer}>
                        {loading ? (
                            <PulseLoader color={colors.theme.secondary} />
                        ) : (
                            publications.length === 0 ? (
                                <span className={styles.noPublications}>{emptyPublicationText}</span>
                            ) : (
                                <>
                                    {publications?.slice(0, next)?.map((publication, index) => {
                                        return (
                                            <HomePagePublication key={index} publication={publication}/>
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
                    <div className={styles.createButtonLink} onClick={handleCreatePublicationButton}>
                        <AddIcon height={24} width={24} fill={colors.theme.white} />
                        <p>CRIAR PUBLICAÇÃO</p>
                    </div>
            </div>
        </div>
    );
}

export  default SearchPage;