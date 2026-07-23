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
    // Sanctioned exception to the no-polling rule: only for the async ticket
    // issuance window (provider status ONPROGRESS) — pass a function so the
    // interval turns itself off outside that window.
    refetchInterval?: number | false | ((data: GetBookFlightResponse | undefined) => number | false);
}

const useQueryCheckBookFlight = ({ enabled, onSuccess, request, refetchInterval } : Props ) => {

    const queryKeys: CheckBookQueryKeys[] = [
        {
            key: GET_CHECK_BOOK_FLIGHT,
            payload: request
        }
    ];

    const { data, isFetching, isLoading, error, refetch } = useQuery(queryKeys, ({ queryKey: [{ payload }]}) => checkBookFlight(payload), {
        enabled,
        onSuccess,
        refetchInterval,
    });

    return {
        isFetching,
        isLoading,
        data,
        queryKeys,
        error,
        refetch,
    };
}

export default useQueryCheckBookFlight