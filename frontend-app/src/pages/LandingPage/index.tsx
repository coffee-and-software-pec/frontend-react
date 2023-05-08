import React from "react";

import styles from "./LandingPage.module.css";

import AppIcon from '../../assets/app_icon.svg'
import { GoogleLogin } from "@react-oauth/google";


function LandingPage() {
    console.log(process.env.CLIENT_ID)

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
                        containerProps={{
                            style: {
                                width: "100%",
                            }
                        }}
                        logo_alignment="center"
                        shape="pill"
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
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
            </div>
        </div>
    )
}

export default LandingPage;