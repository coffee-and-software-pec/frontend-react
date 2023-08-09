import TopBar from "../../components/TopBar";
import styles from './PerfilPage.module.css';
import statsStyles from './StatisticNumber.module.css';
import { useAuth } from '../../contexts/AuthContext';
import React, { useEffect, useRef, useState } from "react"
import colors from  '../../styles/colorsConfig.json';
import { ReactComponent as UserIcon } from '../../assets/user_icon.svg';
import { getUserStatsById, updateUser } from "../../services/UserService";
import UserStats from "../../models/UserStats";
import { getCommentDateTime } from "../../utils/CommentDateUtil";
import DefaultImage from "../../components/DefaultImage";
import DefaultUserImage from '../../assets/default-user.png';
import UserActivity from "../../components/UserActivity";
import UserDTO from "../../services/dtos/UserDTO";
import { toast } from "react-toastify";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import ActivityDTO from "../../services/dtos/ActivityDTO";
import { getActivitByUserId } from "../../services/ActivityService";

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
    const [userActivityList, setUserActivityList] = useState<ActivityDTO[]>([]);

    const [photoUrl, setPhotoUrl] = useState("");

    const cancelRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
            const statsUser = await getUserStatsById(loadedUser.id!!, loadedUser.id!!);
            setPhotoUrl(statsUser.photoURL);
            setStatsUser(statsUser);
        }

        statsUser();

        async function fetchActivities() {
            const activities = await getActivitByUserId(loadedUser.id!!);
            setUserActivityList(activities);
        }

        fetchActivities();
    }, [])

    async function handleUpdateUser() {
        try {
            const userDto = await updateUser(statsUser?.id!!, {
                email: statsUser?.email ?? "",
                name: statsUser?.name ?? "",
                photoURL: photoUrl ?? ""
            });
            toast("Perfil salvo!", {
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: false,
                theme: "light",
                type: "success"
            });
        } catch(_) {
            toast("Erro ao salvar publicação!", {
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: false,
                theme: "light",
                type: "error"
            });
        }
    }

    function handleSavePhotoUrlModal() {
        onClose();
    }

    return (
        <ChakraProvider>
            <div className={styles.container}>
                <TopBar />
                <div className={styles.mainContent}>
                    <div className={styles.perfil}>
                        <div className={styles.userActionsContainer}>
                            <div className={styles.userIcon} onClick={() => onOpen()}>
                                <DefaultImage 
                                    alt=""
                                    src={photoUrl}
                                    defaultImage={DefaultUserImage}
                                />
                            </div> 
                        </div>
                        <div className={styles.userInfo}>
                            <div className={styles.nome}>
                                <p>Nome</p>
                                <input 
                                    value={statsUser?.name} 
                                    onChange={e => setStatsUser({...statsUser, name: e.target.value} as UserStats)}
                                />
                            </div>
                            <div className={styles.email}>
                                <p>Email</p>
                                <input
                                    value={statsUser?.email}
                                    onChange={e => setStatsUser({...statsUser, email: e.target.value} as UserStats)}
                                    disabled
                                />
                            </div>
                            <div className={styles.createButtonLink}>
                                <button 
                                    className={styles.sendButton}
                                    onClick={handleUpdateUser}>
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
                                <UserActivity activityDto={activity} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered={true}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold' className={styles.alertDialogHeader}>
                            {"Alterando imagem"}
                        </AlertDialogHeader>
                        <AlertDialogBody className={styles.alertDialogBody}>
                            <DefaultImage
                                src={photoUrl}
                                alt=""
                                defaultImage={DefaultUserImage}
                            />
                            <input 
                                type="text" 
                                placeholder="Coloque aqui o link da sua foto" 
                                value={photoUrl} 
                                onChange={e => setPhotoUrl(e.target.value)}
                            />
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} className={styles.alertDialogCancelButton}>
                                Cancelar
                            </Button>
                            <Button
                                colorScheme='blue'
                                onClick={handleSavePhotoUrlModal}
                                ml={3}
                            >
                                SALVAR
                            </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
        </ChakraProvider>
    );
}

export default PerfilPage;