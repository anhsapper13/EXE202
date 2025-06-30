import { BaseService } from "./base.service";

export const OrderService = {
  getOrderItemsByOrderId: async (orderId: string) => {
    return BaseService.get({
      url: `/order/${orderId}/items`,
    });
  },
 
};
