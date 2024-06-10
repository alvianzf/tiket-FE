import axios from "axios";
import { DefaultError, DefaultSuccess } from "./types";


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
  
export default baseAPI