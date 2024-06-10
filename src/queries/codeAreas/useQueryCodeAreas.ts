import { getCodeAreas } from "@api/codeArea";
import { CodeAreaResponse } from "@api/codeArea/types";
import { GET_CODE_AREAS_KEY } from "@constants/queryKey";
import { useQuery } from "react-query";

interface CodeAreasQueryKeys {
    key: string;
}

interface Props {
    enabled?: boolean;
    onSuccess?: (response: CodeAreaResponse) => void;
}

const useQueryCodeAreas = ({ enabled, onSuccess } : Props ) => {

    const queryKeys: CodeAreasQueryKeys[] = [
        {
            key: GET_CODE_AREAS_KEY
        }
    ];

    const { data, isFetching, error } = useQuery(queryKeys, () => getCodeAreas(), {
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

export default useQueryCodeAreas