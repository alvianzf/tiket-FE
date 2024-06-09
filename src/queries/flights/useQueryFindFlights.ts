import { findFlights } from "@api/findFlights";
import { FindFlightsRequest, FindFlightsResponse } from "@api/findFlights/types";
import { GET_FLIGHTS_KEY } from "@constants/queryKey";
import { useQuery } from "react-query";

interface CodeFlightsQueryKeys {
    key: string;
    payload: FindFlightsRequest;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: FindFlightsResponse) => void;
    request: FindFlightsRequest;
}

const useQueryFindFlights = ({ enabled, onSuccess, request } : Props ) => {

    const queryKeys: CodeFlightsQueryKeys[] = [
        {
            key: GET_FLIGHTS_KEY,
            payload: request
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, ({ queryKey: [{ payload }]}) => findFlights(payload), {
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

export default useQueryFindFlights