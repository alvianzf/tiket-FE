import baseApi from "../baseApi";
import { SubmitItineraryPayload, SubmitItineraryResponse } from "./types";

const API_ITINERARY = "/api/itinerary";

export const submitItinerary = async (payload: SubmitItineraryPayload): Promise<SubmitItineraryResponse> => {
    const response = await baseApi.post(API_ITINERARY, payload);
    return response.data;
};
