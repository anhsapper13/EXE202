import { ICart } from "./cart.type";
import { IProduct } from "./product.type";

export interface ICartItem {
  cart_item_id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  unitPrice: string;
  addedAt: string;
  cart?: ICart;
  product?: IProduct;
}
