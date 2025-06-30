import { PaginationParams } from "@/types/pagination.interface";
import { IProduct } from "@/types/product.interface";
import { BaseService } from "./base.service";

const ProductService = {
  getAllProducts: async (params: PaginationParams) => {
    const response = await BaseService.get({
      url: "/products",
      payload: params,
    });

    return {
      ...response,
      data: {
        items: response.data.data.data, 
        meta: {
          currentPage: response.data.data.page, 
          totalPages: response.data.data.totalPages,
          pageSize: response.data.data.limit, 
          totalItems: response.data.data.total, 
          hasNextPage: response.data.data.hasNextPage,
          hasPreviousPage: response.data.data.hasPreviousPage,
        },
      },
    };
  },

  getProductById: async (productId: string) => {
    const response = await BaseService.get<IProduct>({
      url: `/products/${productId}`,
    });

    return {
      ...response,
      data: response.data.data
    }
  },

  addProduct: async (payload: any) => {
    return BaseService.post<IProduct>({
      url: "/products",
      payload,
    });
  },

  editProduct: async (productId: string, payload: any) => {
    return BaseService.patch<IProduct>({
      url: `/products/${productId}`,
      payload,
    });
  },

  deleteProduct: async (productId: string) => {
    return BaseService.delete<IProduct>({
      url: `/products/${productId}`,
    });
  },
};

export default ProductService;