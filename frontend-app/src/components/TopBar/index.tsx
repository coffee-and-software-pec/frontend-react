import styles from './TopBar.module.css';

import PublicationIcon from '../../assets/publication_icon.svg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import UserIcon from '../../assets/user_icon.svg';
import BellIcon from '../../assets/bell_icon.svg';
import CarretDownIcon from '../../assets/carret_down_icon.svg';
import DropdownMenu from '../DropdownMenu';


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
                    <img src={PublicationIcon} alt="App Logo" />
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
                    <img className={styles.notificationIcon} src={BellIcon} alt="Notification icon" />
                    <img className={styles.userIcon} src={UserIcon} alt="User icon" />
                    <img 
                        className={styles.dropdownMenuIcon} 
                        src={CarretDownIcon} 
                        alt="Dropdown menu icon" 
                        onClick={() => setActiveDropdownMenu(!activeDropdownMenu)}
                    />
                </div>
            </div>
            <DropdownMenu active={activeDropdownMenu} setActive={setActiveDropdownMenu} />
        </>
    );
}

export default TopBar;