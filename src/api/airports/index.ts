import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { GetAirportsResponse } from "./types";

const API_AIRPORTS = '/api/airports';

export const getAirports = async () => 
    await baseAPI.get<GetAirportsResponse>(API_AIRPORTS)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);