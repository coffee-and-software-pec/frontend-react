import { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import styles from './FollowPage.module.css';

import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg';
import UserInfo from '../../components/UserInfo';
import UserStats from '../../models/UserStats';
import { getUserStats } from '../../services/UserService';
import { useAuth } from '../../contexts/AuthContext';

export default function FollowPage() {

    const { loadUser } = useAuth();

    const [searchInputText, setSearchInputText] = useState("");
    const [users, setUsers] = useState<UserStats[]>([]);
    const [usersToShow, setUsersToShow] = useState<UserStats[]>([]);

    function userHasSearchInput(user: UserStats, inputText: string) {
        return user.name.toLowerCase().includes(inputText.toLowerCase()) || 
                user.email.toLowerCase().includes(inputText.toLowerCase());
    }

    function handleOnClickSearchButton() {
        setUsersToShow(users.filter(user => userHasSearchInput(user, searchInputText)));
    }

    useEffect(() => {
        async function fetchUsers() {
            const user = loadUser();
            const users = await getUserStats(user.id!!);
            setUsers(users);
            setUsersToShow(users);
        }   

        fetchUsers();
    }, []);

    return (
        <div className={styles.container}>
            <TopBar />
            <div className={styles.mainContent}>
                <div className={styles.searchBarContainer}>
                    <input 
                        type="text" 
                        placeholder='busque por nome ou email'
                        value={searchInputText}
                        onChange={e => setSearchInputText(e.target.value)}
                    />
                    <div className={styles.searchButton} onClick={handleOnClickSearchButton}>
                        <SearchIcon width={28} height={28} />
                    </div>
                </div>
                <div className={styles.userListContainer}>
                    {usersToShow.map(user => (
                        <UserInfo user={user} key={user.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}