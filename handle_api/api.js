import axios from 'axios';
import { API_URL } from '../config';

// Construct API base path consistently across environments
const API_BASE = `${API_URL}/api/v1`;

const axiosClient = axios.create({
    baseURL: API_BASE,
    responseType: 'json',
    timeout: 15 * 1000,
});

// Attach interceptors for consistent headers and error handling
axiosClient.interceptors.request.use(
    (config) => {
        // Keep existing headers (like Authorization) set by callers
        config.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(config.headers || {}),
        };
        return config;
    },
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Normalize axios errors
        const normalizedError = {
            message: error?.response?.data?.message || error.message || 'Request failed',
            status: error?.response?.status,
            data: error?.response?.data,
            url: error?.config?.url,
            method: error?.config?.method,
        };
        return Promise.reject(normalizedError);
    }
);

// Keep backward-compatible default export signature: api(config)
export default function api(config) {
    return axiosClient(config);
}