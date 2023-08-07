import TopBar from "../../components/TopBar";
import styles from './PerfilPage.module.css';
import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useState } from "react"
import colors from  '../../styles/colorsConfig.json';
import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';

function PerfilPage() {

    const { user, loadUser } = useAuth();
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const loadedUser = loadUser();

        if (loadedUser !== undefined) {
            fetch(loadedUser.photoURL, {referrerPolicy: 'no-referrer'})
            .then(resp => {
                setImageLoaded(resp.status === 200);
            })
            .catch(_ => setImageLoaded(false));
        }
    }, [])

    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.mainContent}>
                <div className={styles.perfil}>
                    <div className={styles.userActionsContainer}>
                        <div className={styles.userIcon}>
                                        {imageLoaded ? 
                                            <img       
                                                src={user?.photoURL}
                                                alt=""
                                                referrerPolicy='no-referrer'
                                            /> :
                                            <UserIcon color={colors.theme.white} />
                                        }
                        </div> 
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.nome}>
                            <p>Nome</p>
                            <h1>Felipe</h1>
                        </div>
                        <div className={styles.email}>
                            <p>Email</p>
                            <h1>felipe@felipe</h1>
                        </div>
                        <div className={styles.createButtonLink}>
                            <button className={styles.sendButton}>
                                SALVAR             
                            </button>
                        </div>                    
                    </div>
                    <div className={styles.estatisticas}>
                        <p>Estatísticas</p>
                        <div className={styles.numeros}>
                            <h1>3</h1>
                            <h5>Publicações</h5>
                            <h1>100</h1>
                            <h5>Likes</h5>
                            <h1>20</h1>
                            <h5>Comentários</h5>
                            <h1>16</h1>
                            <h5>Seguidores</h5>
                            <h1>8</h1>
                            <h5>Seguindo</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.atividades}>
                    Atividades recentes
                </div>
            </div>
        </div>
    );
}

export default PerfilPage;