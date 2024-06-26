import { getAirports } from "@api/airports";
import { GetAirportsResponse } from "@api/airports/types";
import { GET_AIRPORTS_KEY } from "@constants/queryKey";
import { useQuery } from "react-query";

interface GetAirlinesQueryKeys {
    key: string;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: GetAirportsResponse) => void;
}

const useQueryGetAirports = ({ enabled, onSuccess } : Props ) => {

    const queryKeys: GetAirlinesQueryKeys[] = [
        {
            key: GET_AIRPORTS_KEY
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, () => getAirports(), {
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

export default useQueryGetAirports