import { checkBookFlight } from "@api/bookFlight";
import { GetBookFlightResponse } from "@api/bookFlight/types";
import { GET_CHECK_BOOK_FLIGHT } from "@constants/queryKey";
import { useQuery } from "react-query";

interface CheckBookQueryKeys {
    key: string;
    payload: string;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: GetBookFlightResponse) => void;
    request: string;
}

const useQueryCheckBookFlight = ({ enabled, onSuccess, request } : Props ) => {

    const queryKeys: CheckBookQueryKeys[] = [
        {
            key: GET_CHECK_BOOK_FLIGHT,
            payload: request
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, ({ queryKey: [{ payload }]}) => checkBookFlight(payload), {
        enabled,
        onSuccess,
        refetchInterval: 30_000
    });

    return {
        isFetching,
        data,
        queryKeys,
        error,
    };
}

export default useQueryCheckBookFlight