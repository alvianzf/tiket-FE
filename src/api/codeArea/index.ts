import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { CodeAreaResponse } from "./types";

const API_CODE_AREA = '/api/getcodearea-json';

export const getCodeAreas = async () => 
    await baseAPI.get<CodeAreaResponse>(API_CODE_AREA)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError)