import useKorapay from "../../hooks/payments/useKorapay";
import { Button } from "../Button";

interface Props {
    publicKey: string,
    amount: number,
    onSuccess: () => void,
    onClose: () => void,
}


export default function KoraButton({ publicKey, amount, onSuccess, onClose }: Props) {
    const config = {
        public_key: publicKey,
        amount: amount,
        customer: {
            name: "John Doe",
            email: "johndoe@gmail.com"
        },
        onClose: onClose,
        onSuccess: onSuccess
    };

    const handleKorapay = useKorapay(config);

    return (
        <Button
            onClick={handleKorapay}>
            Pay with KoraPay
        </Button>
    );
}
