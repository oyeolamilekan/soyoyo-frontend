import { useEffect, useRef } from "react";

export const useClickOutside = (handler: Function, additionalIdName?: string) => {
    const nodeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const maybeHandler = (event: any) => {
            if ((event.target.id !== additionalIdName) && (nodeRef?.current && !nodeRef?.current?.contains(event.target as Node))) {
                handler()
            }
        };
        document.addEventListener("mousedown", maybeHandler)
        return () => {
            document.addEventListener("mousedown", maybeHandler)
        }
    },)

    return nodeRef
}