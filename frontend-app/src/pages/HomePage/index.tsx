import React, { useEffect, useState } from "react"
import { api } from "../../api/api";

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
        <>
            <h2>Home Page</h2>
            <table style={{border: '1px solid black'}} rules="all">
                <tr>
                    <th>id</th>
                    <th>first_name</th>
                    <th>last_name</th>
                    <th>email</th>
                    <th>gender</th>
                    <th>status</th>
                </tr>
                {
                    employees.map((employee: any) => {
                        return (
                            <tr>
                                <td>{employee.id}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.status}</td>
                            </tr>
                        )
                    })
                }
            </table>
            
        </>
    )
}

export default HomePage;