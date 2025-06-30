import { IOrderItem } from "./order-item.type";
import { User } from "./user.type";

export interface IOrder {
  order_id: string;
  user_id: string;
  provider_id?: string; // Nullable, as per the entity
  order_type: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  user: User;
  provider?: User;
  orderItems: IOrderItem[];
  address?: string;
}
