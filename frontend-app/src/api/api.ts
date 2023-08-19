import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { checkAuthToken, TOKEN_KEY } from '../utils/TokenUtil';

const envBackendURL = process.env.REACT_APP_ENV === "dev" ? 
    process.env.REACT_APP_MOCKED_BACKENDAPI : 
    process.env.REACT_APP_BACKENDAPI;

const api = axios.create({
    baseURL: envBackendURL
});

const authenticatedApi = axios.create({
    baseURL: envBackendURL
});

export { api, authenticatedApi };