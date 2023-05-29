import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { fetchAPIKey, generateAPIKey } from "../../api/business";
import CustomSupense from "../CustomSuspense";
import useCopyToClipboard from "../../hooks/useClipBoard";

export default function ApiKey() {
    const queryClient = useQueryClient()

    const { slug } = useParams();

    const { copy } = useCopyToClipboard()

    const { isLoading, isError, data } = useQuery({
        enabled: slug !== null,
        queryKey: ['api_key', slug],
        retry: false,
        onError: ({ response }) => {
            const { message } = response?.data;
            toast.error(message);
        },
        queryFn: () => fetchAPIKey(slug as string)
    })

    const { mutateAsync } = useMutation(generateAPIKey, {
        cacheTime: Infinity,
        onSuccess({ message }) {
            queryClient.invalidateQueries(['api_key', slug])
            toast.success(message);
        },
        onError(err: any) {
            const { message } = err.response?.data;
            toast.error(message);
        },
    })

    const onClick = (e: any) => {
        toast.success("Generating API key.")
        e.preventDefault()
        mutateAsync(slug as string)
    }

    const onCopy = (text: string) => {
        copy(text)
        toast.success("Text copied");
    }

    return (
        <CustomSupense
            isLoading={isLoading}
            isError={isError}
        >
            <div className="px-5 py-5">
                <h2 className="font-semibold">API Page</h2>
                <div className="bg-white shadow-md max-w-2xl p-5 mt-3 rounded space-y-6">
                    <div className="flex justify-between">
                        <p className="font-semibold">API keys</p>
                        <p className="cursor-pointer text-sky-700" onClick={onClick}>Generate API keys</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Public key</p>
                        <p className="cursor-pointer" onClick={() => onCopy(data?.data?.public_key)}>{data?.data?.public_key}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Private key</p>
                        <p className="cursor-pointer" onClick={() => onCopy(data?.data?.private_key)}>{data?.data?.private_key}</p>
                    </div>
                </div>
            </div>
        </CustomSupense>
    )
}
