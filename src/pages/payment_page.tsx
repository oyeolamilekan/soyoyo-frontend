import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchPaymentPage, fetchPublicPaymentProviders } from "../api/payment_pages";
import { formatNumber } from "../utils/apps.utils";
import CustomSupense from "../components/CustomSuspense";
import FlutterwaveButton from "../components/pay/FlutterwaveButton";
import PaystackButton from "../components/pay/PaystackButton";
import KoraButton from "../components/pay/KoraButton";
import FincraButton from "../components/pay/FincraButton";

export default function PaymentPage() {
  const { slug } = useParams();

  const { isLoading, isError, data } = useQuery({
    enabled: slug !== null,
    queryKey: ['payment_page', slug],
    retry: false,
    onError: ({ response }) => {
      const { message } = response?.data;
      toast.error(message);
    },
    queryFn: () => fetchPaymentPage(slug as string)
  })

  const { isLoading: isLoadingProviders, isError: isErrorProviders, data: providers } = useQuery({
    enabled: data?.data?.business?.slug !== null,
    queryKey: ['providers', data?.data?.business?.slug],
    retry: false,
    onError: ({ response }) => {
      const { message } = response?.data;
      toast.error(message);
    },
    queryFn: () => fetchPublicPaymentProviders(data?.data?.business?.slug as string)
  })

  const initiatizePaymentButtons = (buttonKey: string, publicKey: string) => {
    switch (buttonKey) {
      case "flutterwave":
        return <FlutterwaveButton publicKey={publicKey} amount={data?.data?.amount} callback={() => { }} onClose={() => { }} />
      case "paystack":
        return <PaystackButton publicKey={publicKey} amount={data?.data?.amount} onSuccess={() => { }} onClose={() => { }} />
      case "korapay":
          return <KoraButton publicKey={publicKey} amount={parseInt(data?.data?.amount ?? 0)} onSuccess={() => { }} onClose={() => { }} />
      case "fincra":
          return <FincraButton publicKey={publicKey} amount={parseInt(data?.data?.amount ?? 0)} onSuccess={() => { }} onClose={() => { }} />
      default:
        break;
    }
  }

  return (
    <CustomSupense isLoading={isLoading && isLoadingProviders} isError={isError && isErrorProviders}>
      <div className="max-w-3xl md:m-auto flex flex-col items-center m-5">
        <h1 className="text-center mt-5">{data?.data?.business?.title} page.</h1>
        <h2 className="mb-5 mt-4 text-center">{data?.data?.title}</h2>
        <h3 className="mb-5 text-center">{formatNumber(data?.data?.amount)}</h3>
        {(providers?.data ?? []).map((provider: any, index: number) => initiatizePaymentButtons(provider?.title, provider?.public_key))}
      </div>
    </CustomSupense>
  )
}
