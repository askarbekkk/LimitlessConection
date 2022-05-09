import axios from 'axios';

const api = axios.create({
    baseURL: `https://api.temir.ae/api/v1/`,
});

export default api;
