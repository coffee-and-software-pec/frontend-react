import styles from './TopBar.module.css';

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ReactComponent as PublicationIcon } from '../../assets/publication_icon.svg';
import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';
import { ReactComponent as BellIcon } from '../../assets/bell_icon.svg';
import { ReactComponent as CarretDownIcon } from '../../assets/carret_down_icon.svg';

import DropdownMenu from '../DropdownMenu';

import colors from  '../../styles/colorsConfig.json';


enum HomeRoutes {
    HOME = "/home",
    MY_PUBLICATIONS = "/minhaspublicacoes",
    SEARCH = "/buscar"
  }

function TopBar() {
    const [activeRoute, setActiveRoute] = useState<HomeRoutes>(HomeRoutes.HOME);
    const location = useLocation();

    const [activeDropdownMenu, setActiveDropdownMenu] = useState(false);

    useEffect(() => {
        setActiveRoute(location.pathname as HomeRoutes)
    }, [])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    {/* <img src={PublicationIcon} alt="App Logo" /> */}
                    <PublicationIcon />
                    <span>AFTER CLASS</span>
                </div>
                <div className={styles.menuContainer}>
                    <Link 
                        className={`${styles.menuButton} ${activeRoute === HomeRoutes.HOME ? styles.menuButtonActive : ""}`} 
                        to='/home'
                    >
                        home
                    </Link>
                    <Link 
                        className={`${styles.menuButton} ${activeRoute === HomeRoutes.MY_PUBLICATIONS ? styles.menuButtonActive : ""}`} 
                        to='/minhaspublicacoes'
                    >
                        minhas publicações
                    </Link>
                    <Link 
                        className={`${styles.menuButton} ${activeRoute === HomeRoutes.SEARCH ? styles.menuButtonActive : ""}`}
                        to='/buscar'
                    >
                        buscar
                    </Link>
                </div>
                <div className={styles.userActionsContainer}>
                    <BellIcon className={styles.notificationIcon} width={16} height={16} />
                    <UserIcon className={styles.userIcon} color={colors.theme.white} />
                    <CarretDownIcon 
                        className={styles.dropdownMenuIcon} 
                        onClick={() => setActiveDropdownMenu(!activeDropdownMenu)}
                    />
                </div>
            </div>
            <DropdownMenu active={activeDropdownMenu} setActive={setActiveDropdownMenu} />
        </>
    );
}

export default TopBar;