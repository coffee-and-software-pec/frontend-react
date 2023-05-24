import React, { useEffect, useState } from "react";

import styles from "./LandingPage.module.css";

import { ReactComponent as AppIcon } from '../../assets/app_icon.svg'
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import LandingPublication from "../../components/LandingPublication";
import LandPublication from "../../models/LandPublication";
import { useAuth } from "../../contexts/AuthContext";
import { checkAuthToken } from "../../utils/TokenUtil";

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

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                <div className={styles.logoHeader}>
                    <AppIcon width={32} height={32} />
                    <h1>AFTER CLASS</h1>
                </div>
                <div className={styles.appInfo}>
                    <h1 className={styles.title}>TÍTULO 1</h1>
                    <h2 className={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique diam non magna hendrerit.</h2>
                </div>
                <div className={styles.loginContainer}>
                    <p>Crie sua conta agora</p>
                    <GoogleLogin
                        logo_alignment="center"
                        shape="pill"
                        width="300"
                        onSuccess={credentialResponse => {
                            onSuccessGoogleLogin(credentialResponse);
                            navigate("/home");
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    <p>ou</p>
                    <div className={styles.formContainer}>
                        <input type="text" placeholder="Nome Sobrenome"/>
                        <input type="text" placeholder="email@email.com" />
                        <button>CRIAR CONTA</button>
                    </div>
                </div>
                <div className={styles.popularPublicationsContainer}>
                    <p>veja o que outras pessoas estão publicando agora</p>
                    <div className={styles.publicationsGridContainer}>
                        {
                            publications.map(publication => (
                                <LandingPublication publication={publication} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;