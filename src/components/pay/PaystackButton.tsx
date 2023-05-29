import { usePaystackPayment } from "react-paystack";
import { Button } from "../Button";

interface PaymentButtonProps {
    publicKey: string,
    amount: string,
    onSuccess: () => void,
    onClose: () => void,
}

export default function PaystackButton({ publicKey, onSuccess, amount, onClose }: PaymentButtonProps) {

    const config = {
        reference: (new Date()).getTime().toString(),
        email: "user@example.com",
        amount: parseInt(amount) * 100,
        publicKey: publicKey,
    };

    const initializePayment = usePaystackPayment(config);

    return (
        <Button onClick={() => {
            initializePayment(onSuccess, onClose)
        }}>
            Pay with Paystack
        </Button>
    );
};