import { PaymentMode } from "../../../Utils/enums";

export interface PaymentReceivedDTO {
    dateTime: string;
    partyName: string;
    paymentAmount: string;
    paymentMode: PaymentMode;
    description?: string;
    chequeNumber?: string;
    imageUrl?: string;
}