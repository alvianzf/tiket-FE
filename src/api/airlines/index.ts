import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { GetAirLinesResponse } from "./types";

const API_AIRLINES = '/api/flight/airlines';

export const getAirlines = async () =>
    await baseAPI.get<GetAirLinesResponse>(API_AIRLINES)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);