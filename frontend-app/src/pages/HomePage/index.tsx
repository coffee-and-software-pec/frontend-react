import React, { useEffect, useState } from "react"
import { api } from "../../api/api";
import TopBar from "../../components/TopBar";

import styles from './HomePage.module.css';

function HomePage() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchEmployees() {
            const result = await api.get("/employees");
            setEmployees(result.data);
        }
        
        fetchEmployees();
    }, []);

    return (
        <div className={styles.container}>
            <TopBar />
        </div>
    )
}

export default HomePage;