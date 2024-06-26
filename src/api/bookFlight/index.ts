import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { GetBookFlightRequest, GetBookFlightResponse } from "./types";

const API_BOOK_FLIGHT = '/api/book';

export const bookFlight = async (request: GetBookFlightRequest) => 
    await baseAPI.post<GetBookFlightResponse>(API_BOOK_FLIGHT, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);
