import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

axiosApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosApi;