import { useMemo } from "react";

interface Props {
    title: string;
}

export interface MetaTag {
    name: string;
    content?: string;
}

export interface ReturnProps {
    title: string;
    metaTags: Array<MetaTag>;
}

const useMetaTags = ({ title = ''} : Props): ReturnProps => {
    return useMemo(() => {
        const pageTitle = `${title} | TiketQ`;

        return {
            title: pageTitle,
            metaTags: [
                {
                    name: 'title', content: pageTitle
                }
            ]
        }
    },[title])
};

export default useMetaTags

