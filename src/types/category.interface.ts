import { QueryParams } from "./pagination.interface";

export enum CategoryType {
  SERVICE = 'service',
  PRODUCT = 'product'
}
export interface ICategory {
    id:string;
    name: string;
    description?: string;
    type: CategoryType;
}
export interface CategoryRequestParams extends QueryParams {
  type?: CategoryType;
}


export interface ServiceListResponse {
  category: ICategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
