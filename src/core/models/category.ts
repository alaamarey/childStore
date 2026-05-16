import { Product } from './iproduct';

export interface Category {
    id: number;
    name: string;
    products: Product[];
}