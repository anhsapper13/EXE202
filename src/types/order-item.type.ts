import { IOrder } from "./order.type";
import { IProduct } from "./product.type";
import { IService } from "./service.interface";

export interface IOrderItem {
  order_item_id: string;
  order_id: string;
  product_id?: string; // Nullable, as per the entity
  service_id?: string; // Nullable, as per the entity
  quantity: number;
  unitPrice: number;
  order: IOrder; // ManyToOne relationship
  product?: IProduct; // ManyToOne relationship, nullable
    service?: IService; // ManyToOne relationship, nullable
  //   serviceBookings: ServiceBooking[]; // OneToMany relationship
}
