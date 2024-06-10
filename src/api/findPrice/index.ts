import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { FindPriceRequest } from "./types";
import { FindFlightsResponse } from "@api/findFlights/types";

const API_FIND_PRICE = '/api/getprice-json';

export const getFindPrice = async (request: FindPriceRequest) => 
    await baseAPI.post<FindFlightsResponse>(API_FIND_PRICE, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError)