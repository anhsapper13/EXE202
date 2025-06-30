import { OrderRequestParam, OrderStatus } from "@/types/order.interface";
import { IOrder } from "@/types/order.type";
import { ApiResponse } from "@/types/request-response.interface";
import { BaseService } from "./base.service";

export const OrderService = {
  createOrderForCash: async (payload: any): Promise<ApiResponse<IOrder>> => {
    return BaseService.post<IOrder>({ url: "/order", payload });
  },
  getOrdersBasedOnUse: async (params?: OrderRequestParam)  => {
    return BaseService.get({
      url: "/order",
      payload: params,
    });
  },
  getOrderDetails: async (orderId: string): Promise<ApiResponse<IOrder>> => {
    return BaseService.get({
      url: `/order/${orderId}`,
    });
  },
  completedOrderByUser: async (orderId:string, status : OrderStatus) =>{
    return BaseService.patch({
      url: `/order/${orderId}/completed`,
      payload: { status },
    });
  }
};
