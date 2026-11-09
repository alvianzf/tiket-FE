import baseApi from "../baseApi";
import { ActivityListResponse, BookActivityPayload, BookActivityResponse } from "./types";

const API_ACTIVITIES = "/api/activities";

export const getActivities = async (): Promise<ActivityListResponse> => {
    const response = await baseApi.get(API_ACTIVITIES, { params: { available: true } });
    return response.data;
};

export const bookActivity = async (activityId: number, payload: BookActivityPayload): Promise<BookActivityResponse> => {
    const response = await baseApi.post(`${API_ACTIVITIES}/${activityId}/book`, payload);
    return response.data;
};
