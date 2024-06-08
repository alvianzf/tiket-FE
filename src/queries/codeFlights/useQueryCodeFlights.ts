import { getCodeFlights } from "@api/codeFlights";
import { CodeFlightResponse } from "@api/codeFlights/type";
import { GET_CODE_FLIGHTS_KEY } from "@constants/queryKey";
import { useQuery } from "react-query";

interface CodeFlightsQueryKeys {
    key: string;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: CodeFlightResponse) => void;
}

const useQueryCodeFlights = ({ enabled, onSuccess } : Props ) => {

    const queryKeys: CodeFlightsQueryKeys[] = [
        {
            key: GET_CODE_FLIGHTS_KEY
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, () => getCodeFlights(), {
        enabled,
        staleTime: 300_000,
        cacheTime: 300_000,
        onSuccess
    });

    return {
        isFetching,
        data,
        queryKeys,
        error,
    };
}

export default useQueryCodeFlights