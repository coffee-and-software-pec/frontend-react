import React, { useEffect, useState } from "react";

import styles from "./LandingPage.module.css";

import { ReactComponent as AppIcon } from '../../assets/app_icon.svg'
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import LandingPublication from "../../components/LandingPublication";
import LandPublication from "../../models/LandPublication";
import { useAuth } from "../../contexts/AuthContext";
import { checkAuthToken } from "../../utils/TokenUtil";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getLandingPublications } from "../../services/PublicationService";
import Publication from "../../models/Publication";

function LandingPage() {
    const navigate = useNavigate();
    const [publications, setPublications] = useState<Publication[]>([] as Publication[]);

    const { onSuccessGoogleLogin, onFailureGoogleLogin } = useAuth();

    useEffect(() => {
        async function fetchPublications() {
            try {
                const result = await getLandingPublications();
                setPublications(result);
            } catch(e) {
                setPublications([]);
            }
        }

        function redirectIfExistsToken() {
            const token = checkAuthToken();
            if (token) {
                navigate('/home');
            } else {
                fetchPublications();
            }
        }
        
        redirectIfExistsToken();
    }, [])

    function handleGoogleSuccessLogin(credentialResponse: CredentialResponse) {
        onSuccessGoogleLogin(credentialResponse)
            .then(() => {
                navigate("/home");
            }).catch(() => {
                toast("Erro no cadastro!", {
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: false,
                    theme: "light",
                    type: "error"
                });
            });   
    }

    function handleGoogleLoginFailure() {
        toast("Erro na autenticação pela Google", {
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
            theme: "light",
            type: "error"
        });
        onFailureGoogleLogin();
    }

    function handleRegisterWithEmail() {
        toast("Esta opção está desativada", {
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
            theme: "light",
            type: "info"
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                <div className={styles.logoHeader}>
                    <AppIcon width={32} height={32} />
                    <h1>AFTER CLASS</h1>
                </div>
                <div className={styles.appInfo}>
                    <h1 className={styles.title}>Compartilhe seu know-how</h1>
                    <h2 className={styles.subtitle}>Leia e escreva publicações sobre temas relacionados a computação. Crie tutoriais, guias ou discussões sobre a nossa área.</h2>
                </div>
                <div className={styles.loginContainer}>
                    <p>Crie sua conta agora</p>
                    <GoogleLogin
                        logo_alignment="center"
                        shape="pill"
                        width="300"
                        onSuccess={handleGoogleSuccessLogin}
                        onError={handleGoogleLoginFailure}
                    />
                    <p>ou</p>
                    <div className={styles.formContainer}>
                        <input type="text" placeholder="Nome Sobrenome"/>
                        <input type="text" placeholder="email@email.com" />
                        <button onClick={handleRegisterWithEmail}>CRIAR CONTA</button>
                        <ToastContainer />
                    </div>
                </div>
                <div className={styles.popularPublicationsContainer}>
                    <p>veja o que outras pessoas estão publicando agora</p>
                    <div className={styles.publicationsGridContainer}>
                        {
                            publications.length === 0 ? (
                                <span>Ainda não há publicações cadastradas</span>
                            ) : (
                                publications.map((publication, index) => (
                                    <LandingPublication key={index} publication={publication} />
                                ))
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;