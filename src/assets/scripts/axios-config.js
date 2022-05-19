import axios from 'axios';
import { useUserStore } from "@/stores/userStore";
import { API_BASE_URL } from 'config';

let http = axios.create({
    baseURL: API_BASE_URL,
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status == 304;
    }
});



http.interceptors.request.use(function (config) {
    config.headers.Authorization = useUserStore().authToken;
    return config;
});

export default http;