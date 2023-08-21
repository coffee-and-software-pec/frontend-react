import React, { useEffect, useState } from "react";

import styles from './DropdownMenu.module.css';

import UserIcon from '../../assets/user_icon.svg';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface DropDownMenuProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

function DropdownMenu({active, setActive}: DropDownMenuProps) {
    const navigate = useNavigate();
    const { logout, loadUser, user } = useAuth();

    useEffect(() => {
        const loadedUser = loadUser();
    }, [])

    function handleClickLogoutButton() {
        logout();
        navigate("/");
    }

    return (
        <div 
            className={styles.container} 
            style={{display: active ? 'block' : 'none'}}
            onMouseLeave={() => setActive(false)}
        >
            <div className={styles.userInfo}>
                <p>{user?.name}</p>
                <div className={styles.userImage}>
                    {/* <img src={UserIcon} alt="" style={{opacity: 0}}/> */}
                </div>
            </div>
            <div className={styles.menuOptionsContainer}>
                <div className={styles.menuOptionBox}>
                    <Link 
                        style={{textDecoration: 'none'}} 
                        className={`${styles.menuOption}`} 
                        to='/perfil'
                    >
                        Perfil
                    </Link>
                </div>
                {/* <div className={styles.menuOptionBox}>
                    <span className={styles.menuOption}>Configurações</span>
                </div> */}
                <span 
                    className={styles.menuOption}
                    onClick={handleClickLogoutButton}
                >Sair</span>
            </div>
        </div>
    )
}

export default DropdownMenu;