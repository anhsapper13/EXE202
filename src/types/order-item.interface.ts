import { IBooking } from "./booking.interface";
import { IOrder } from "./order.interface";
import { IProduct } from "./product.interface";
import { IService } from "./service.interface";


export interface OrderItem {
  order_item_id: string;
  order_id: string;
  product_id?: string;
  service_id?: string;
  quantity: number;
  unitPrice: number;
  
  // Relations
  order?: IOrder;
  product?: IProduct;
  service?: IService;
  serviceBookings?: IBooking[];
}

export interface CreateOrderItemRequest {
  order_id: string;
  product_id?: string;
  service_id?: string;
  quantity: number;
  unitPrice: number;
}

export interface UpdateOrderItemRequest {
  quantity?: number;
  unitPrice?: number;
}