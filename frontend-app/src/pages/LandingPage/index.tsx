import React, { useEffect, useState } from "react";

import styles from "./LandingPage.module.css";

import AppIcon from '../../assets/app_icon.svg'
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import LandingPublication from "../../components/LandingPublication";
import Publication from "../../models/Publication";

function LandingPage() {
    const navigate = useNavigate();
    const [publications, setPublications] = useState<Publication[]>([] as Publication[]);

    useEffect(() => {
        async function fetchPublications() {
            const result = await api.get("/publications");
            setPublications(result.data);
        }
        
        fetchPublications();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                <div className={styles.logoHeader}>
                    <img src={AppIcon} alt="App icon" width={32} height={32} />
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