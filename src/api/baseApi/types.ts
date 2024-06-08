import { AxiosError } from "axios";


export interface DefaultSuccess<T> {
    data: T;
}

export type DefaultError<T> = AxiosError<{
    errors?: T;
    message?: string;
    tokenExpired?: boolean;
}>;