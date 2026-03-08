import { FerryRoute, FerrySector, FerryTrip, FerryBooking } from "../../types/ferry";
import baseApi from "../baseApi";

export const API_FERRY_SECTORS = '/api/ferry/master/sectors';
export const API_FERRY_ROUTES = '/api/ferry/master/routes';
export const API_FERRY_SEARCH_TRIPS = '/api/ferry/trips/search';
export const API_FERRY_RESERVE = '/api/ferry/booking';
export const API_FERRY_BOOKING_DETAILS = (id: string) => `/api/ferry/booking/${id}/details`;
export const API_FERRY_SUBMIT_BOOKING = '/api/ferry/booking/submit';
export const API_FERRY_GET_BOOKING = (id: string) => `/api/ferry/booking/${id}`;

export const getFerrySectors = async (): Promise<FerrySector[]> => {
  const response = await baseApi.get(API_FERRY_SECTORS);
  return response.data;
};

export const getFerryRoutes = async (params: { searchString?: string; sectorID?: string; pageIndex?: number; pageSize?: number }): Promise<FerryRoute[]> => {
  const response = await baseApi.get(API_FERRY_ROUTES, { params });
  return response.data;
};

export const searchFerryTrips = async (params: { embarkation: string; destination: string; tripdate: string }): Promise<FerryTrip[]> => {
  const response = await baseApi.get(API_FERRY_SEARCH_TRIPS, { params });
  return response.data;
};

export const reserveFerryBooking = async (data: any): Promise<FerryBooking> => {
  const response = await baseApi.post(API_FERRY_RESERVE, data);
  return response.data;
};

export const addFerryPassenger = async (bookingId: string, data: any): Promise<any> => {
  const response = await baseApi.post(API_FERRY_BOOKING_DETAILS(bookingId), data);
  return response.data;
};

export const submitFerryBooking = async (data: { id: string; emailConfirmation: string; remarks: string }): Promise<any> => {
  const response = await baseApi.post(API_FERRY_SUBMIT_BOOKING, data);
  return response.data;
};

export const getFerryBooking = async (id: string): Promise<FerryBooking> => {
  const response = await baseApi.get(API_FERRY_GET_BOOKING(id));
  return response.data;
};
