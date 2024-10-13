import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { MidtransSnapRequest, MidtransSnapResponse } from "./types";

const API_CREATE_MIDTRANS_TOKEN = '/api/create-midtrans-token';

export const createMidtransToken = async (request: MidtransSnapRequest) =>
    await baseAPI
        .post<MidtransSnapResponse>(API_CREATE_MIDTRANS_TOKEN, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);
