import useFincra from "../../hooks/payments/useFincra";
import { Button } from "../Button";

interface Props {
    publicKey: string,
    amount: number,
    onSuccess: () => void,
    onClose: () => void,
}

export default function FincraButton({ publicKey, amount, onSuccess, onClose }: Props) {

    const config = {
        customer: {
            email: "user@example.com",
            name: "John Doe",
        },
        trx_ref: (new Date()).getTime().toString(),
        feeBearer: "business",
        amount: amount,
        publicKey: publicKey,
        onSuccess: onSuccess,
        onClose: onClose
    };

    const initializePayment = useFincra(config);

    return (
        <Button onClick={initializePayment}>
            Pay with Fincra
        </Button>
    );
}
