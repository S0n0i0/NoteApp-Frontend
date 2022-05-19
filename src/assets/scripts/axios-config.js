import axios from 'axios';
import { API_BASE_URL } from '../../../config';

let http = axios.create({
    baseURL: API_BASE_URL,
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status == 304;
    }
});

export default http;