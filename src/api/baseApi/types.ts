import { AxiosError } from "axios";


export interface DefaultSuccess<T> {
    data: T;
}

export type DefaultError<T> = AxiosError<{
    errors?: T;
    message?: string;
    tokenExpired?: boolean;
}>;

export type DateDayFormat = `${number}${number}` | `${number}`;
export type DateMonthFormat = `${number}${number}` | `${number}`;
export type DateYearFormat = `${number}${number}${number}${number}`;

export type DateISOFormat = `${DateYearFormat}-${DateMonthFormat}-${DateDayFormat}`;

export type DateIndoFormat = `${DateDayFormat}-${DateMonthFormat}-${DateYearFormat}`;