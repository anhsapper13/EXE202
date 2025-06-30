import { IOrder } from "./order.interface";
import { QueryParams } from "./pagination.interface";

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer',
}
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface IPaymentTransaction {
    payment_id:string,
    order_id: string;
    amount: number;
    payment_method: PaymentMethod;
    paymentStatus: string;
    transaction_id?: string;
    createdAt: Date;
    escrow?: {
        escrow_id: string;
        payment_id: string;
        order_id: string;
        amount: number;
        createdAt: Date;
    }[];
    order?: IOrder
}

export interface PaymentTransactionRequestParams extends QueryParams {
    order_id?: string;
    status?: PaymentStatus;
    payment_method?: PaymentMethod;
}