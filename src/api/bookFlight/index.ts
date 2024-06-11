import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { BookFlightRequest, BookFlightResponse, CheckBookRequest, CheckBookResponse } from "./types";

const API_BOOK_FLIGHT = '/api/postbooking-json';
const API_CHECK_BOOK = '/api/getstatusbooking-json';

export const bookFlight = async (request: BookFlightRequest) => 
    await baseAPI.post<BookFlightResponse>(API_BOOK_FLIGHT, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);

export const checkBookFlight = async (request: CheckBookRequest) =>
    await baseAPI.post<CheckBookResponse>(API_CHECK_BOOK, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);