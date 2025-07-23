import { AddToCartPayload, ICart } from "@/types/cart.type";
import { ApiResponse } from "@/types/request-response.interface";
import { BaseService } from "./base.service";

export const CartService = {
  getCartByUserId: async (): Promise<ApiResponse<ICart>> => {
    return BaseService.get<ICart>({
      url: `/cart/user-cart`,
    });
  },
  addToCart: async (payload: AddToCartPayload)=> {
    return BaseService.post({
      url: `/cart-item`,
      payload,
    });
  },
};
