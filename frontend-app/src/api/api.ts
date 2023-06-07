import axios from 'axios';

const envBackendURL = process.env.REACT_APP_ENV === "dev" ? 
    process.env.REACT_APP_MOCKED_BACKENDAPI : 
    process.env.REACT_APP_BACKENDAPI;

const api = axios.create({
    baseURL: envBackendURL
});

export { api };