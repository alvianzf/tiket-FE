import axios from "axios";
import { DefaultError, DefaultSuccess } from "./types";
import { toast } from 'react-toastify';


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
    baseURL: process.env.NEXT_PUBLIC_API_URL,
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