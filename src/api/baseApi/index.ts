import axios from "axios";
import { DefaultError, DefaultSuccess } from "./types";
import { toast } from 'react-toastify';


export const getApiUrl = () => {
    let apiUrl = '';
    try {
        apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    } catch (e) {
        // Safe fallback if 'process' is not defined globally in the browser
    }
    
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.');
        
        if (isLocal) {
            return 'http://localhost:3001';
        }
    }
    
    return apiUrl || 'https://api.tiketq.com';
};

export const defaultQueryOption = {
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
};

export const handleDefaultSuccess = <T>({ data }: DefaultSuccess<T>) => data;
export const handleDefaultError = <T>(error: DefaultError<T>) => {
    const responseError = error?.response?.data ?? {};

    throw responseError;
};

const baseAPI = axios.create({
    baseURL: getApiUrl(),
    timeout: 90_000, // Only wait for 90 seconds
});

baseAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (!error.response || error.code === 'ERR_NETWORK') {
            // Network error (backend is down or unreachable)
            toast.error("Unable to connect to the server. Please check your connection or try again later.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        return Promise.reject(error);
    }
);

export default baseAPI