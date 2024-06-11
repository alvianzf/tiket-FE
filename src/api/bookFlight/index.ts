import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { BookFlightRequest, BookFlightResponse } from "./types";

const API_BOOK_FLIGHT = '/api/postbooking-json';

export const bookFlight = async (request: BookFlightRequest) => 
    await baseAPI.post<BookFlightResponse>(API_BOOK_FLIGHT, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);