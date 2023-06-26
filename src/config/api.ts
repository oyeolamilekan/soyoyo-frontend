import axios from "axios";
import { APPNAME } from "./status";

const APIURL = import.meta.env.VITE_BASE_URL

const getToken = () => {
    const store = JSON.parse(sessionStorage.getItem(APPNAME) ?? '{}');
    const apiToken = store.token;
    return apiToken ? `Bearer ${apiToken}` : '';
};

const axiosInstance = axios.create({
    baseURL: APIURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: getToken(),
        Accept: '*/*',
    },
    timeout: 10000,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.clear(); 
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };
