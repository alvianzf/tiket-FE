import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { GetAirportsResponse } from "./types";

const API_AIRPORTS = '/api/airports';
const API_SEARCH_AIRPORTS = (search: string) => `/api/search-airport/${search}`;

export const getAirports = async () => 
    await baseAPI.get<GetAirportsResponse>(API_AIRPORTS)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);

export const searchAirports = async (search: string) => 
    await baseAPI.get<GetAirportsResponse>(API_SEARCH_AIRPORTS(search))
            .then(handleDefaultSuccess)
            .catch(handleDefaultError);