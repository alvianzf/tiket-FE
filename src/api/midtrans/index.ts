import baseAPI, { handleDefaultError, handleDefaultSuccess } from "@api/baseApi";
import { midtrans_snap_request, midtrans_snap_response } from "./types";

const API_CREATE_MIDTRANS_TOKEN = '/api/create-midtrans-token';

export const createMidtransToken = async (request: midtrans_snap_request) =>
    await baseAPI
        .post<midtrans_snap_response>(API_CREATE_MIDTRANS_TOKEN, request)
        .then(handleDefaultSuccess)
        .catch(handleDefaultError);
