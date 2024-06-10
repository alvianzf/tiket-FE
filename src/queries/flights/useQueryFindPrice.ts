import { getFindPrice } from "@api/findPrice";
import { FindPriceRequest, FindPriceResponse } from "@api/findPrice/types";
import { GET_FLIGHT_PRICES } from "@constants/queryKey";
import { useQuery } from "react-query";

interface FlightPriceQueryKeys {
    key: string;
    payload: FindPriceRequest;
}

interface Props {
    enabled?: boolean;
    request: FindPriceRequest;
    onSuccess?: (response: FindPriceResponse) => void;
}


const useQueryFindPrice = ({ enabled, request, onSuccess } : Props ) => {

    const queryKeys: FlightPriceQueryKeys[] = [
        {
            key: GET_FLIGHT_PRICES,
            payload: request
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, ({ queryKey: [{ payload }]}) => getFindPrice(payload), {
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

export default useQueryFindPrice