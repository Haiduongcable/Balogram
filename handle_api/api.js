import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.16.101:8000/api/v1',
    responseType: 'json',
    timeout: 15 * 1000,
});


export default axiosClient;