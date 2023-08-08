import TopBar from "../../components/TopBar";
import styles from './PerfilPage.module.css';
import statsStyles from './StatisticNumber.module.css';
import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useState } from "react"
import colors from  '../../styles/colorsConfig.json';
import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';
import { getUserStatsById } from "../../services/UserService";
import UserStats from "../../models/UserStats";
import { getCommentDateTime } from "../../utils/CommentDateUtil";
import DefaultImage from "../../components/DefaultImage";
import DefaultUserImage from '../../assets/default-user.png';
import UserActivity, { UserActivityModel } from "../../components/UserActivity";

interface StatisticNumberProps {
    statisticNumber: number;
    statisticText: string;
}

function StatisticNumber({ statisticNumber, statisticText }: StatisticNumberProps) {
    return (
        <div className={statsStyles.statisticContainer}>
            <h1>{statisticNumber}</h1>
            <span>{statisticText}</span>
        </div>
    )
}

function PerfilPage() {

    const { user, loadUser } = useAuth();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [statsUser, setStatsUser] = useState<UserStats>();
    const [userActivityList, setUserActivityList] = useState<UserActivityModel[]>([]);

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
        setUserActivityList([{
            author_name: 'Teste',
            author_image: "",
            activity_type: "COMMENT",
            activity_text: "Um comentário",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        }, {
            author_name: 'Teste',
            author_image: "",
            activity_type: "LIKE",
            activity_text: "",
            activity_date: new Date().toString()
        },
        ]);
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
                            <DefaultImage 
                                alt=""
                                src={user?.photoURL!!}
                                defaultImage={DefaultUserImage}
                            />
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
                            <StatisticNumber 
                                statisticNumber={statsUser?.posts!!}
                                statisticText={"publicações"}
                            />
                            <StatisticNumber 
                                statisticNumber={statsUser?.likes!!}
                                statisticText={"likes"}
                            />
                            <StatisticNumber 
                                statisticNumber={statsUser?.comments!!}
                                statisticText={"comentários"}
                            />
                            <StatisticNumber 
                                statisticNumber={statsUser?.followersCount!!}
                                statisticText={"seguidores"}
                            />
                            <StatisticNumber 
                                statisticNumber={statsUser?.followingCount!!}
                                statisticText={"seguindo"}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.atividades}>
                    <h1>Atividades recentes</h1>
                    <div className={styles.listaAtividades}>
                        {(userActivityList).map(activity => (
                            <UserActivity userActivityModel={activity} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PerfilPage;