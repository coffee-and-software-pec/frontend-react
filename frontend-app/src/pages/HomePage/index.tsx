import React, { useEffect, useState } from "react"
import { api } from "../../api/api";
import TopBar from "../../components/TopBar";

import styles from './HomePage.module.css';

import { ReactComponent as AddIcon } from '../../assets/plus_icon.svg';
import colors from "../../styles/colorsConfig.json";
import SelectTagBox from "../../components/SelectTagBox";
import Publication from "../../models/Publication";
import HomePagePublication from "../../components/HomePagePublication";
import { Link, useNavigate } from "react-router-dom";
import { getSortedPublications, getSortedPublicationsByTags } from "../../services/PublicationService";
import { BounceLoader, PulseLoader } from "react-spinners";
import { embraceWithLoading } from "../../utils/LoadingUtil";
import { useAuth } from "../../contexts/AuthContext";
import { toast, ToastContainer } from "react-toastify";

enum TabName {
    TRENDING,
    FRESH,
    TOP
}

function HomePage() {
    const { loadUser } = useAuth();
    const navigate = useNavigate();

    const [publications, setPublications] = useState<Publication[]>([]);
    const [activeTab, setActiveTab] = useState<TabName>(TabName.TRENDING);
    

    const publicationsNumber = 4;
    const [next, setNext] = useState<number>(publicationsNumber);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPublications() {
            embraceWithLoading(setLoading, async () => {
                const result = await getSortedPublications();
                const publicationList = result as Publication[];
                if (publicationList.length > 0) {
                    setPublications(result);
                }
            }, 1000);
        }
        
        fetchPublications();
    }, []);

    async function handleTabOnClick(tabName: TabName) {
        setActiveTab(tabName);

        let sortColumn = "date";
        let order = "desc";

        switch (tabName) {
            case TabName.TRENDING:
                sortColumn = "date";
                order = "desc";
                break;
            case TabName.FRESH:
                sortColumn = "date";
                order = "desc";
                break;
            case TabName.TOP:
                sortColumn = "heartsCount";
                order = "desc";
                break;
            default:
                console.log("not specified tab");
        }

        embraceWithLoading(setLoading, async () => {
            const newPublications = await getSortedPublications(sortColumn, order);
            setPublications([...newPublications]);
        }, 500);
        
    }

    const handleMorePublications = () => {
        setNext(next + publicationsNumber);
    }

    async function handleOnClickFilterButton(tags: string[]) {
        embraceWithLoading(setLoading, async () => {
            const newPublications = await getSortedPublicationsByTags(tags);
            setPublications([...newPublications]);
        }, 500);
    }

    function handleCreatePublicationButton() {
        if (loadUser() === undefined) {
            toast("Você precisa estar logado para criar publicações!", {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: false,
                theme: "light",
                type: "info"
            });
        } else {
            navigate("/publicacao");
        }
    }

    return (
        <>
            <div className={styles.container}>
                <TopBar />
                <div className={styles.mainContent}>
                    <div className={styles.selectTagContainer}>
                        <SelectTagBox onClickFilterButton={handleOnClickFilterButton} />
                    </div>
                    <div className={styles.publicationOrderContainer}>
                        <p 
                            className={activeTab === TabName.TRENDING ? styles.active : ''}
                            onClick={() => handleTabOnClick(TabName.TRENDING)}
                        >
                            TRENDING
                        </p>
                        <p 
                            className={activeTab === TabName.FRESH ? styles.active : ''}
                            onClick={() => handleTabOnClick(TabName.FRESH)}
                        >
                            RECENTES
                        </p>
                        <p 
                            className={activeTab === TabName.TOP ? styles.active : ''}
                            onClick={() => handleTabOnClick(TabName.TOP)}
                        >
                            TOP
                        </p>
                    </div>
                    <div className={styles.publicationsContainer}>
                        {loading ? (
                            <PulseLoader color={colors.theme.secondary} />
                        ) : (
                            publications.length === 0 ? (
                                <span className={styles.noPublications}>Não há publicações</span>
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
                        CRIAR PUBLICAÇÃO
                    </div>
                </div>
            </div>  
            <ToastContainer />
        </>
    )
}

export default HomePage;