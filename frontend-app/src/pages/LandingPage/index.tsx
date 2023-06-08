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

function LandingPage() {
    const navigate = useNavigate();
    const [publications, setPublications] = useState<LandPublication[]>([] as LandPublication[]);

    const { onSuccessGoogleLogin, onFailureGoogleLogin } = useAuth();

    useEffect(() => {
        async function fetchPublications() {
            const result = await api.get("/landingPublications");
            setPublications(result.data);
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
            });
        
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
                        onError={() => {
                            console.log('Login Failed');
                        }}
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
                            publications.map(publication => (
                                <LandingPublication key={publication.id} publication={publication} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;