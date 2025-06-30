export enum Role {
  CUSTOMER = 'customer',
  SERVICE_PROVIDER = 'service_provider',
  PRODUCT_PROVIDER = 'product_provider',
  CONSULTANT_STAFF = 'consultant_staff',
  FORUM_STAFF = 'forum_staff',
  ADMIN = 'admin',
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  companyName?: string;
  age?: string;
  address?: string;
  description?: string;
  avatar?: string;
  isVerified: boolean;
  balance?: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  password?: string;
}