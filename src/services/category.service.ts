
import { ICategory } from "@/types/category.interface";
import { PaginationParams } from "@/types/pagination.interface";
import { ApiResponse } from "@/types/request-response.interface";
import { BaseService } from "./base.service";

const CategoryService = {
  getAllCategories: async (params: PaginationParams) => {
    const response = await BaseService.get({
      url: "/categories",
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

  

  getCategoryById: async (categoryId: string): Promise<ApiResponse<ICategory>> => {
    return BaseService.get<ICategory>({
      url: `/categories/${categoryId}`,
    });
  },

  addCategory: async (payload: any) => {
    return BaseService.post<ICategory>({
      url: "/categories",
      payload,
    });
  },

  editCategory: async (categoryId: string, payload: any) => {
    return BaseService.patch<ICategory>({
      url: `/categories/${categoryId}`,
      payload,
    });
  },

  deleteCategory: async (categoryId: string) => {
    return BaseService.delete<ICategory>({
      url: `/categories/${categoryId}`,
    });
  },
    getServiceCategoryClient: async (params?: any) => {
    return await BaseService.get({
      url: "/categories/client",
      payload: params,
    });
  },
      getCategoryService: async (params?: any) => {
    return await BaseService.get({
      url: "/categories",
      payload: params,
    });
  },
};

export default CategoryService;
