import { useQuery } from "react-query";
import { getFerrySectors, getFerryRoutes, searchFerryTrips } from "../../api/ferry";

export const GET_FERRY_SECTORS_KEY = 'ferrySectors';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET_FERRY_ROUTES_KEY = (params: any) => ['ferryRoutes', params];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SEARCH_FERRY_TRIPS_KEY = (params: any) => ['searchFerryTrips', params];

export const useQueryFerrySectors = () => {
  return useQuery(GET_FERRY_SECTORS_KEY, getFerrySectors);
};

export const useQueryFerryRoutes = (params: { searchString?: string; sectorID?: string; pageIndex?: number; pageSize?: number }) => {
  return useQuery(GET_FERRY_ROUTES_KEY(params), () => getFerryRoutes(params));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useQuerySearchFerryTrips = (params: { embarkation: string; destination: string; tripdate: string }, options?: any) => {
  return useQuery(SEARCH_FERRY_TRIPS_KEY(params), () => searchFerryTrips(params), {
    enabled: !!params.embarkation && !!params.destination && !!params.tripdate,
    ...options
  });
};
