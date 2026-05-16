export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface Order {
    id: number;
    orderDate: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
}

export interface OrderSummary {
    id: number;
    orderDate: string;
    customerName: string;
    totalAmount: number;
    status: string;
}