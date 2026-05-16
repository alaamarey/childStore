export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    rate: number;
    ratingCount: number;
    category: string;
}

export interface AddProductPayload {
    title: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    rate: number;
    ratingCount: number;
    categoryName: string;
}

export interface UpdateStockPayload {
    stock: number;
}