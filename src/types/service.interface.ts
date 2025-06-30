import { ICategory } from "./category.interface";
import { QueryParams } from "./pagination.interface";
import { User } from "./user.type";

export enum ServiceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
export interface IService {
  service_id: string;
  provider_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  duration: {
    minutes: number;
  };
  image?: string;
  status: ServiceStatus;
  createdAt: Date;
  updatedAt: Date;
  category?: ICategory;
  provider?: User;
}

export interface ServiceRequestParam extends QueryParams {
  category_id?: string;
  name?: string;
}


export interface ServiceListResponse {
  services: IService[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
