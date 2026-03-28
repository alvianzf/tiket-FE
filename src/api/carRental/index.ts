import baseApi from "../baseApi";
import { CarSearchParams, CarSearchResponse, CarTypesResponse } from "./types";

const API_CAR_SEARCH = '/api/car-rental/search';
const API_CAR_TYPES = '/api/car-rental/types';

export const searchCars = async (params: CarSearchParams): Promise<CarSearchResponse> => {
    const response = await baseApi.get(API_CAR_SEARCH, { params });
    return response.data;
};

export const getCarTypes = async (): Promise<CarTypesResponse> => {
    const response = await baseApi.get(API_CAR_TYPES);
    return response.data;
};
