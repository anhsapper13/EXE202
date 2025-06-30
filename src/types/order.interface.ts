import { OrderItem } from "./order-item.interface";
import { QueryParams } from "./pagination.interface";
import { User } from "./user.type";

export enum OrderType {
  PRODUCT = 'product',
  SERVICE = 'service',
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface IOrder {
  order_id: string;
  user_id: string;
  provider_id?: string;
  order_type: OrderType;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  
  // Relations
  user?: User;
  provider?: User;
  orderItems?: OrderItem[];
}

export interface OrderRequestParam extends QueryParams {
  order_id?: string
}


export interface CreateOrderRequest {
  user_id: string;
  provider_id?: string;
  order_type: OrderType;
  totalAmount: number;
}

export interface UpdateOrderRequest {
  status?: OrderStatus;
  totalAmount?: number;
}