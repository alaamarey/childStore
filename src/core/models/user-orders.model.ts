
export interface IUserOrder {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: number;
  shippingAddress: string;
  itemCount: number;
}