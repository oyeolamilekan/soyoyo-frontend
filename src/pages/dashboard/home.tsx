import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { fetchPaymentPagesSummary } from "../../api/payment_pages";
import DashboardContainer from "../../components/DashboardContainer";
import CustomSupense from "../../components/CustomSuspense";

export default function Home() {
    const { slug } = useParams();
    const { isLoading, isError, data } = useQuery({
        enabled: slug !== null,
        queryKey: ['business_stats', slug],
        retry: false,
        onError: ({ response }) => {
            const { message } = response?.data;
            toast.error(message);
        },
        queryFn: () => fetchPaymentPagesSummary(slug as string)
    });

    return (
        <DashboardContainer>
            <CustomSupense
                isLoading={isLoading}
                isError={isError}
            >
                <div className="my-5 px-6">
                    <h3 className='font-bold'>Home</h3>
                    <div className="flex space-x-14 items-center my-5">
                        <div>
                            <h2 className="text-4xl">{data?.data?.enabled}</h2>
                            <p className="text-gray-500 mt-2 font-light">Enabled Pages</p>
                        </div>
                        <div>
                            <h2 className="text-4xl">{data?.data?.disabled}</h2>
                            <p className="text-gray-500 mt-2 font-light">Disabled Pages</p>
                        </div>
                    </div>
                </div>
            </CustomSupense>
        </DashboardContainer>

    )
}
