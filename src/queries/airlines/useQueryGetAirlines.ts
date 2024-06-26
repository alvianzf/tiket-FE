import { getAirlines } from "@api/airlines";
import { GetAirLinesResponse } from "@api/airlines/types";
import { GET_AIRLINES_KEY } from "@constants/queryKey";
import { useQuery } from "react-query";

interface GetAirlinesQueryKeys {
    key: string;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: GetAirLinesResponse) => void;
}

const useQueryGetAirlines = ({ enabled, onSuccess } : Props ) => {

    const queryKeys: GetAirlinesQueryKeys[] = [
        {
            key: GET_AIRLINES_KEY
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, () => getAirlines(), {
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

export default useQueryGetAirlines