import { searchAirports } from "@api/airports";
import { GetAirportsResponse } from "@api/airports/types";
import { SEARCH_AIRPORTS_KEY } from "@constants/queryKey";
import { useQuery } from "react-query";

interface GetSearchAirportsQueryKeys {
    key: string;
    payload: string;
}

interface Props {
    enabled?: boolean;
    request: string;
    onSuccess?: (response: GetAirportsResponse) => void;
}

const useQuerySearchAirports = ({ enabled, request, onSuccess } : Props ) => {

    const queryKeys: GetSearchAirportsQueryKeys[] = [
        {
            key: SEARCH_AIRPORTS_KEY(request),
            payload: request
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, ({ queryKey: [{ payload }]}) => searchAirports(payload), {
        enabled,
        onSuccess
    });

    return {
        isFetching,
        data,
        queryKeys,
        error,
    };
}

export default useQuerySearchAirports