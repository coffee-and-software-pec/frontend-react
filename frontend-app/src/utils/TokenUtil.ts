import User from "../models/User";

export const TOKEN_KEY = "@RCAuth:token";
export const TOKEN_KEY_USER = "@RCAuth:user";

function getAuthToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY) ;
}

function setAuthToken(token: string) {
    window.localStorage.setItem(TOKEN_KEY, token);
}

function removeAuthToken() {
    window.localStorage.removeItem(TOKEN_KEY);
}

function checkAuthToken() {
    let result = "invalid";

    let token = getAuthToken();
    if (token && token !== "") {
        const currentTime = new Date().getTime() / 1000;
        const { exp } = parseAuthToken(token);
        if (currentTime >= exp) {
            result = 'invalid';
        } else {
            result = token;
        }
    }
    return result;
}

function parseAuthToken(token: string) {
    const [, payload, ] = token.split(".");
    const parsedPayload = JSON.parse(window.atob(payload));
    return parsedPayload;
}

function getUserToken() {
    const token = window.localStorage.getItem(TOKEN_KEY_USER);
    if (token) {
        return JSON.parse(token);
    }
    return undefined;
}

function setUserToken(user: User) {
    window.localStorage.setItem(TOKEN_KEY_USER, JSON.stringify(user));
}

function removeUserToken() {
    window.localStorage.removeItem(TOKEN_KEY_USER);
}

export { 
    getAuthToken, 
    setAuthToken, 
    removeAuthToken, 
    checkAuthToken, 
    parseAuthToken,
    getUserToken,
    setUserToken,
    removeUserToken
};