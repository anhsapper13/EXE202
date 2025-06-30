import { User } from "./user.type";

export interface IProduct {
  image: string;
  id: string;
  provider?: User;
  stockQuantity: number;
  name: string;
  description: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  //other fields later
}
