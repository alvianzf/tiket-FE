import baseApi from "../baseApi";
import { HotelListResponse, BookHotelPayload, BookHotelResponse } from "./types";

const API_HOTELS = "/api/hotels";

export const getHotels = async (): Promise<HotelListResponse> => {
    const response = await baseApi.get(API_HOTELS, { params: { available: true } });
    return response.data;
};

export const bookHotel = async (hotelId: number, payload: BookHotelPayload): Promise<BookHotelResponse> => {
    const response = await baseApi.post(`${API_HOTELS}/${hotelId}/book`, payload);
    return response.data;
};
