import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { CodeFlightResponse } from "./type";

const API_CODE_FLIGHTS = '/api/getcodeflights-json';

export const getCodeFlights = async () => 
    await baseAPI
        .get<CodeFlightResponse>(API_CODE_FLIGHTS)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError)