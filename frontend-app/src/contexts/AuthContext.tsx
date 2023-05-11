import { CredentialResponse } from '@react-oauth/google';
import React, { createContext, useContext, useState } from 'react';
import User from '../models/User';
import { removeAuthToken, removeUserToken, setAuthToken } from '../utils/TokenUtil';

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
    }

    function logout() {
        setUser(null);
        setLogged(false);
        removeAuthToken();
    }

    async function onSuccessGoogleLogin(credentialResponse: CredentialResponse) {
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