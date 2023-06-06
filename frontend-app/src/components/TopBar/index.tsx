import styles from './TopBar.module.css';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { ReactComponent as PublicationIcon } from '../../assets/publication_icon.svg';
import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';
// import UserIcon from '../../assets/user_icon.svg';
import { ReactComponent as BellIcon } from '../../assets/bell_icon.svg';
import { ReactComponent as CarretDownIcon } from '../../assets/carret_down_icon.svg';

import DropdownMenu from '../DropdownMenu';

import colors from  '../../styles/colorsConfig.json';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../api/api';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';


enum HomeRoutes {
    HOME = "/home",
    MY_PUBLICATIONS = "/minhaspublicacoes",
    SEARCH = "/buscar"
  }

function TopBar() {
    const { user, loadUser, onSuccessGoogleLogin } = useAuth();
    const [activeRoute, setActiveRoute] = useState<HomeRoutes>();
    const location = useLocation();
    const [imageLoaded, setImageLoaded] = useState(false);

    const [activeDropdownMenu, setActiveDropdownMenu] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const loadedUser = loadUser();

        setActiveRoute(location.pathname as HomeRoutes)

        if (loadedUser !== undefined) {
            fetch(loadedUser.photoURL)
            .then(resp => {
                setImageLoaded(resp.status === 200);
            })
            .catch(_ => setImageLoaded(false));
        }
    }, [])

    function handleGoogleSuccessLogin(credentialResponse: CredentialResponse) {
        onSuccessGoogleLogin(credentialResponse);
        navigate("#");
        setImageLoaded(true);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
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
                    {
                        user !== undefined ? (
                            <Link 
                                className={`${styles.menuButton} ${activeRoute === HomeRoutes.MY_PUBLICATIONS ? styles.menuButtonActive : ""}`} 
                                to='/minhaspublicacoes'
                            >
                                minhas publicações
                            </Link>
                        ) : ""
                    }
                    <Link 
                        className={`${styles.menuButton} ${activeRoute === HomeRoutes.SEARCH ? styles.menuButtonActive : ""}`}
                        to='/buscar'
                    >
                        buscar
                    </Link>
                </div>
                <div className={styles.userActionsContainer}>
                    {user !== undefined ? 
                        (
                            <>
                                <BellIcon className={styles.notificationIcon} width={16} height={16} />
                                <div className={styles.userIcon}>
                                    {imageLoaded ? 
                                        <img       
                                            src={user?.photoURL}
                                            alt=""
                                        /> :
                                        <UserIcon color={colors.theme.white} />
                                    }
                                </div>  
                                <CarretDownIcon 
                                    className={styles.dropdownMenuIcon} 
                                    onClick={() => setActiveDropdownMenu(!activeDropdownMenu)}
                                />
                            </>
                        ) 
                        : 
                        (
                            <GoogleLogin
                                logo_alignment="center"
                                shape="circle"
                                width="100"
                                onSuccess={credentialResponse => handleGoogleSuccessLogin(credentialResponse)}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        )
                    }
                </div>
            </div>
            {user !== undefined ? <DropdownMenu active={activeDropdownMenu} setActive={setActiveDropdownMenu} /> : ""}
        </>
    );
}

export default TopBar;