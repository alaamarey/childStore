export interface IOrderItem {
  productId: number;

  productName: string;

  quantity: number;

  price: number;

  imageUrl?: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface IOrder {
  id: number;

  userId: number;

  status: OrderStatus;

  totalPrice: number;

  shippingAddress: string;

  createdAt: string;

  updatedAt: string;

  items: IOrderItem[];

  paymentMethod?: string;

  trackingNumber?: string;
}

export interface IUpdateOrderStatus {
  status: OrderStatus;
}

export interface IOrderFilters {
  status?: OrderStatus;

  page?: number;

  pageSize?: number;
}

export interface IOrdersResponse {
  data: IOrder[];

  totalCount: number;

  page: number;

  pageSize: number;
}