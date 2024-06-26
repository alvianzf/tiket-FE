import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { GetFlightRequest, GetFlightResponse } from "./types";

const API_SEARCH_FLIGHTS = '/api/search';

export const searchFlights = async (request: GetFlightRequest) =>
    await baseAPI
        .post<GetFlightResponse>(API_SEARCH_FLIGHTS, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);
