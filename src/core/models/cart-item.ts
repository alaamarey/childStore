export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  image: string;
  stock?: number;
  total: number;
}