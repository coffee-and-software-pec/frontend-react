import TopBar from "../../components/TopBar";
import styles from './PerfilPage.module.css';
import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useState } from "react"
import colors from  '../../styles/colorsConfig.json';
import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';
import { getUserStatsById } from "../../services/UserService";
import UserStats from "../../models/UserStats";
import { getCommentDateTime } from "../../utils/CommentDateUtil";

function PerfilPage() {

    const { user, loadUser } = useAuth();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [statsUser, setStatsUser] = useState<UserStats>();

    useEffect(() => {
        const loadedUser = loadUser();

        if (loadedUser !== undefined) {
            fetch(loadedUser.photoURL, {referrerPolicy: 'no-referrer'})
            .then(resp => {
                setImageLoaded(resp.status === 200);
            })
            .catch(_ => setImageLoaded(false));
        }

        async function statsUser () {
            const statsUser = await getUserStatsById(loadedUser.id!!, loadedUser.id!!)
            setStatsUser(statsUser);
        }

        statsUser();

    }, [])

    function updateUser() {
        
    }


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
                            <input value={statsUser?.name}/>
                        </div>
                        <div className={styles.email}>
                            <p>Email</p>
                            <input
                                value={statsUser?.email}
                                disabled
                            />
                        </div>
                        <div className={styles.createButtonLink}>
                            <button 
                                className={styles.sendButton}
                                onClick={updateUser}>
                                SALVAR             
                            </button>
                        </div>                    
                    </div>
                    <div className={styles.estatisticas}>
                        <p>Estatísticas</p>
                        <div className={styles.numeros}>
                            <h1>{statsUser?.posts}</h1>
                            <h5>Publicações</h5>
                            <h1>{statsUser?.likes}</h1>
                            <h5>Likes</h5>
                            <h1>{statsUser?.comments}</h1>
                            <h5>Comentários</h5>
                            <h1>{statsUser?.followersCount}</h1>
                            <h5>Seguidores</h5>
                            <h1>{statsUser?.followingCount}</h1>
                            <h5>Seguindo</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.atividades}>
                    <h1>Atividades recentes</h1>
                    <div className={styles.listaAtividades}>
                        {imageLoaded ? 
                            <img       
                                src={user?.photoURL}
                                alt=""
                                referrerPolicy='no-referrer'
                            /> :
                            <UserIcon color={colors.theme.white} />
                        }
                        {statsUser?.name}
                        <p>Comentou sua publicação.</p>
                        {getCommentDateTime("2023-06-11T11:36:28.662931")}            
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PerfilPage;