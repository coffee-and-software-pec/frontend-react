import React, { useEffect, useState } from "react"
import { api } from "../../api/api";
import TopBar from "../../components/TopBar";

import styles from './HomePage.module.css';

import { ReactComponent as AddIcon } from '../../assets/plus_icon.svg';
import colors from "../../styles/colorsConfig.json";
import SelectTagBox from "../../components/SelectTagBox";
import Publication from "../../models/Publication";
import HomePagePublication from "../../components/HomePagePublication";
import { Link } from "react-router-dom";

enum TabName {
    TRENDING,
    FRESH,
    TOP
}

function HomePage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [activeTab, setActiveTab] = useState<TabName>(TabName.TRENDING);
    

    const publicationsNumber = 4;
    const [next, setNext] = useState<number>(publicationsNumber);

    useEffect(() => {
        async function fetchPublications() {
            const result = await (await api.get("/publications")).data;
            const publicationList = result as Publication[];
            setPublications([
                publicationList[0],
                publicationList[0],
                publicationList[0],
                publicationList[0],
                publicationList[0],
                publicationList[0],
                publicationList[0],
                publicationList[0],
                publicationList[0],
                publicationList[0]
            ]);
        }
        
        fetchPublications();
    }, []);

    function handleTabOnClick(tabName: TabName) {
        setActiveTab(tabName);
    }

    const handleMorePublications = () => {
        setNext(next + publicationsNumber);
    }

    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.mainContent}>
                <div className={styles.selectTagContainer}>
                    <SelectTagBox />
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
                    {publications?.slice(0, next)?.map(publication => {
                        return (
                            <HomePagePublication publication={publication}/>
                        );
                    })}
                    {next < publications?.length && (
                        <span className={styles.loadMore} onClick={handleMorePublications}
                            >carregar mais publicações</span>
                        )}
                </div>
                <div className={styles.createButtonContainer}>
                    <AddIcon height={24} width={24} fill={colors.theme.white} />
                    <Link to={"/publicacao"} className={styles.createButtonLink}>CRIAR PUBLICAÇÃO</Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage;