import axios from 'axios';

let http = axios.create({
    baseURL: process.env.API_BASE_URL,
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status == 304;
    }
});



http.interceptors.request.use(function (config) {
    config.headers.Authorization = '';
    return config;
});

export default http;