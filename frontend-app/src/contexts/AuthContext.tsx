import { CredentialResponse } from '@react-oauth/google';
import React, { createContext, useContext, useState } from 'react';
import { api } from '../api/api';
import User from '../models/User';
import { parseAuthToken, removeAuthToken, removeUserToken, setAuthToken, setUserToken } from '../utils/TokenUtil';

interface AuthContextProps {
    user: User | null,
    logged: boolean,
    onSuccessGoogleLogin: (response: CredentialResponse) => Promise<void>,
    onFailureGoogleLogin: (response: string) => void,
    logout: () => void,
    loadUser: () => User
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthContextProviderProps {
    children: React.ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User | null>({} as User);
    const [logged, setLogged] = useState(false);

    function loadUser(): User {
        return {} as User;
    }

    function loginSetUser(user: User) {
        setUser(user);
        setLogged(true);
        setUserToken(user);
    }

    function logout() {
        setUser(null);
        setLogged(false);
        removeAuthToken();
        removeUserToken();
    }

    async function onSuccessGoogleLogin(credentialResponse: CredentialResponse) {
        setAuthToken(credentialResponse.credential!!);

        try {
            const userCredentials = parseAuthToken(credentialResponse.credential!!);
            const response = await registerUser({
                email:  userCredentials.email,
                name: userCredentials.name,
                photoURL: userCredentials.picture
            });
            loginSetUser(response.data as User);
        } catch (e) {
            console.log("error on registration");
        }
    }

    function onFailureGoogleLogin(response: string) {
        console.log(response, 'A autenticação pelo Google deu falha.');
    }

    async function registerUser(user: User): Promise<any> {
        return await api.post("/users", user);
    }
 
    return (
        <AuthContext.Provider
            value={{
                user,
                logged,
                onSuccessGoogleLogin,
                onFailureGoogleLogin,
                logout,
                loadUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}