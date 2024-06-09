import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { FindFlightsRequest, FindFlightsResponse } from "./types";

const API_FIND_FLIGHTS = '/api/getflights-json';

export const findFlights = async (request: FindFlightsRequest) =>
    await baseAPI
        .post<FindFlightsResponse>(API_FIND_FLIGHTS, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);

