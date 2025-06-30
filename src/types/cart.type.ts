import { ICartItem } from "./cart-item.type";
import { User } from "./user.type";

export interface ICart {
  cart_id: string;
  user_id: string | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  cartItems?: ICartItem[];
}
