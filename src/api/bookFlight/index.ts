import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { GetBookFlightRequest, GetBookFlightResponse } from "./types";

const API_BOOK_FLIGHT = '/api/book';
const API_CHECK_BOOK_FLIGHT = (code: string) => `/api/book-info/${code}`;

export const bookFlight = async (request: GetBookFlightRequest) => 
    await baseAPI.post<GetBookFlightResponse>(API_BOOK_FLIGHT, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);

export const checkBookFlight = async (code: string) => 
    await baseAPI.get<GetBookFlightResponse>(API_CHECK_BOOK_FLIGHT(code))
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);