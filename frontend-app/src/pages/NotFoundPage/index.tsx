import styles from './NotFoundPage.module.css';
import { Link } from 'react-router-dom';

import {ReactComponent as HomeIcon } from '../../assets/home_icon.svg';

function NotFoundPage() {
    return (
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <h1>404</h1>
                <span className={styles.divider}></span>
                <h2>Página não<br/>encontrada</h2>
                <Link className={styles.homeButton} to="/">
                    <HomeIcon width={32} height={32} />
                    Voltar para home
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;