import React from "react";

import styles from "./LandingPage.module.css";

import { Link } from "react-router-dom";


function LandingPage() {
    return (
        <div className={styles.container}>
            <h1>teste</h1>
            <Link to={"/home"}>navegar para home</Link>
        </div>
    )
}

export default LandingPage;