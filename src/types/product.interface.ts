export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  category_id: string;
  provider_id: string;
  image: string;
  category: {
    id: string;
    name: string;
    type: string;
  }
  provider: {
    id: number;
    username: string;
    name?: string;
    email: string;
    passwordHash?: string;
    reputationPoints?: number;
    joinDate?: Date;
    profileImage?: string;
    bio?: string;
    lastLogin?: Date;
    role: "USER" | "MODERATOR" | "ADMIN";
    isActive?: boolean;
    isVerified?: boolean;
    isBanned?: boolean;
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
}
