import { CredentialResponse } from '@react-oauth/google';
import React, { createContext, useContext, useState } from 'react';
import { api } from '../api/api';
import User from '../models/User';
import UserDTO from '../services/dtos/UserDTO';
import { createUser, getUserByEmail } from '../services/UserService';
import { getUserToken, parseAuthToken, removeAuthToken, removeUserToken, setAuthToken, setUserToken } from '../utils/TokenUtil';

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
        const userToken = getUserToken();
        setUser(userToken);
        return userToken;
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
        const userCredentials = parseAuthToken(credentialResponse.credential!!);

        let response: any = null;
        try {
            response = await createUser({
                email:  userCredentials.email,
                name: userCredentials.name,
                photoURL: userCredentials.picture
            });
        } catch (e) {
            response = await getUserByEmail(userCredentials.email);
        }        

        loginSetUser({
            email: response.email,
            name: response.u_name,
            photoURL: response.photoURL,
            id: response.u_id
        });
        setAuthToken(credentialResponse.credential!!);
    }

    function onFailureGoogleLogin(response: string) {
        console.log(response, 'A autenticação pelo Google deu falha.');
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