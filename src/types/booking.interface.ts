import { QueryParams } from "./pagination.interface";
import { Pet } from "./pet.interface";
import { IService } from "./service.interface";
import { User } from "./user.type";

export enum OrderType {
  PRODUCT = "in_store",
  SERVICE = "delivery",
}

export enum BookingStatus {
  PENDING = "pending",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}
export interface IBooking {
  booking_id: string;
  order_item_id: string;
  service_id: string;
  pet_id?: string;
  bookingTime: string;
  status: string;
  created_at: string;
  description?: string;
  service: IService,
  user: User,
  pet: Pet
}

export interface BookingRequestPram extends QueryParams {
  order_id?: string;
  service_id?: string;
  fromDate?: string;
  toDate?: string;
  status?: string;
}

export interface BookingRequestBody {
  service_id: string;
  provider_id: string;
  pet_name?: string;
  booking_time: string;
  quantity: number;
  total_price: number;
  species?: string;
  breed?: string;
  age?: number;
}

export interface BookingResponse {
  success: boolean;
  order_id: string;
  order_item_id: string;
  booking_id: string;
  payment_url: string;
  message: string;
}
