import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { DehydratedState } from "react-query"

type ReactQueryComponent = {
    dehydratedState?: DehydratedState;
};

export type NextPageWithLayout = NextPage<ReactQueryComponent> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps<ReactQueryComponent> & {
    Component: NextPageWithLayout;
};