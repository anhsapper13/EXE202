import { ApiResponse } from "@/types/request-response.interface";
import { BaseService } from "./base.service";
import { IPaymentTransaction, PaymentTransactionRequestParams } from "@/types/payment-transaction.interface";

export const PaymentTransactionService = {
  getPaymentTransactionsBasedOnUse: async (params?: PaymentTransactionRequestParams) => {
    return BaseService.get({
      url: "/payment-transactions",
      payload: params,
    });
  },
  getPaymentTransactionDetails: async (paymentId: string): Promise<ApiResponse<IPaymentTransaction>> => {
    return BaseService.get({
      url: `/payment-transactions/${paymentId}`,
    });
  }
};
