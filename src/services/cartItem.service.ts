import {
  PaginatedResponse,
  PaginationParams,
} from "@/types/pagination.interface";
import { ApiResponse } from "@/types/request-response.interface";
import { BaseService } from "./base.service";
import { ICartItem } from "@/types/cart-item.type";

export const CartItemService = {
  getCartItems: async (
    cartId: string,
    params: PaginationParams
  ): Promise<ApiResponse<PaginatedResponse<ICartItem>>> => {
    return BaseService.get({
      url: `/cart-item/${cartId}/cart`,
      payload: params,
    });
  },

  getCartItemById: async (
    cartItemId: string
  ): Promise<ApiResponse<ICartItem>> => {
    return BaseService.get<ICartItem>({
      url: `/cart-item/${cartItemId}`,
    });
  },

  createCartItem: async (payload: any): Promise<ApiResponse<ICartItem>> => {
    return BaseService.post<ICartItem>({
      url: `/cart-item`,
      payload,
    });
  },

  updateCartItem: async (
    cartItemId: string,
    payload: any
  ): Promise<ApiResponse<ICartItem>> => {
    return BaseService.patch({
      url: `/cart-item/${cartItemId}`,
      payload,
    });
  },

  deleteCartItem: async (cartItemId: string): Promise<ApiResponse<void>> => {
    return BaseService.delete({
      url: `/cart-item/${cartItemId}`,
    });
  },

  getCartItemsPrice: async (
    cartItemId: string
  ): Promise<ApiResponse<number>> => {
    return BaseService.get<number>({ url: `cart-item/${cartItemId}/total` });
  },
};

export default CartItemService;
