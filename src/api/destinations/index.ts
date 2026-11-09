import baseApi from "../baseApi";
import { DestinationListResponse } from "./types";

const API_DESTINATIONS = "/api/destinations";

export const getDestinations = async (params?: { area?: string; category?: string }): Promise<DestinationListResponse> => {
    const response = await baseApi.get(API_DESTINATIONS, { params: { ...params, available: true } });
    return response.data;
};
