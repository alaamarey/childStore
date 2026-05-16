import { CartItem } from './cart-item';

export interface MyCart {
  id: number;
  items: CartItem[];
  total: number;
}