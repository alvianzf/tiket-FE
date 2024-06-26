import { searchFlights } from "@api/searchFlights";
import { GetFlightRequest, GetFlightResponse } from "@api/searchFlights/types";
import { GET_FLIGHTS_KEY } from "@constants/queryKey";
import { useQuery } from "react-query";

interface CodeFlightsQueryKeys {
    key: string;
    payload: GetFlightRequest;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: GetFlightResponse) => void;
    request: GetFlightRequest;
}

const useQuerySearchFlights = ({ enabled, onSuccess, request } : Props ) => {

    const queryKeys: CodeFlightsQueryKeys[] = [
        {
            key: GET_FLIGHTS_KEY,
            payload: request
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, ({ queryKey: [{ payload }]}) => searchFlights(payload), {
        enabled,
        staleTime: 300_000,
        onSuccess
    });

    return {
        isFetching,
        data,
        queryKeys,
        error,
    };
}

export default useQuerySearchFlights