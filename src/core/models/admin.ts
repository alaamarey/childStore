export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  isApproved: boolean;
  isDeleted: boolean;
   online?: boolean; 
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  categoryId: number;
  rate: number;
  ratingCount: number;
}

export interface IBanner {
  id: number;
  title: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  displayOrder: number;
}

export interface ISeller {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  isApproved: boolean;
}

export interface IStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingSellers: number;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  userId: string;
  fullName: string;
  email: string;
  role: string;
  expiration: string;
}