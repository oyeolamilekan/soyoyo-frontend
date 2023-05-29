import { useFlutterwave } from "flutterwave-react-v3";
import { Button } from "../Button";
import { FlutterWaveResponse, FlutterwaveConfig } from "flutterwave-react-v3/dist/types";

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

interface PaymentButtonProps {
    publicKey: string,
    amount: string,
    callback: (data: FlutterWaveResponse) => void,
    onClose: () => void,
}

export default function FlutterwaveButton({ publicKey, amount, callback, onClose }: PaymentButtonProps) {
    const config: DeepPartial<FlutterwaveConfig> = {
        public_key: publicKey,
        tx_ref: Date.now().toString(),
        amount: parseInt(amount),
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: "oye@gmail.com"
        }
    };

    const handleFlutterPayment = useFlutterwave(config as FlutterwaveConfig);

    return (
        <Button
            onClick={() => {
                handleFlutterPayment({
                    callback,
                    onClose,
                });
            }}>
            Pay with Flutterwave
        </Button>
    )
}
