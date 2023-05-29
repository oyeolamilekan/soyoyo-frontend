import { ReactNode } from "react";
import Loader from "./Loader";

type SuspencePropType = {
    children: ReactNode,
    fallBackEmpty?: ReactNode,
    isLoading: boolean,
    isEmpty?: boolean | null,
    isError: boolean,
}

export default function CustomSupense({
    children,
    fallBackEmpty,
    isLoading,
    isEmpty,
    isError
}: SuspencePropType) {
    if (isError)
        return <div className="text-center p-5">Something bad happended, kindly reach out to support.</div>
    else if (isLoading)
        return <div className="text-center p-5"><Loader color="black" width="35px" height="35px"/></div>
    else if (isEmpty)
        return <>{fallBackEmpty}</>
    else
        return <>{children}</>
}