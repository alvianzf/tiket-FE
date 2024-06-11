import { checkBookFlight } from "@api/bookFlight";
import { CheckBookRequest, CheckBookResponse } from "@api/bookFlight/types";
import { GET_CHECK_BOOK_FLIGHT } from "@constants/queryKey";
import { useQuery } from "react-query";

interface CheckBookQueryKeys {
    key: string;
    payload: CheckBookRequest;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: CheckBookResponse) => void;
    request: CheckBookRequest;
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
        onSuccess
    });

    return {
        isFetching,
        data,
        queryKeys,
        error,
    };
}

export default useQueryCheckBookFlight