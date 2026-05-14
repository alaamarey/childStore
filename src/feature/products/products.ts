// products.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products';
import { IProduct } from '../../core/models/iproduct';

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   image: string;
//   stock: number;
//   rate: number;
//   ratingCount: number;
//   categoryId: number;
//   category: null;
//   cartItems: null;
// }

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  private readonly productService = inject(ProductService);

  products: IProduct[] = [];
  loading: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.error = null;

    this.productService.getAllProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
      }
    });
  }

  addToCart(productId: number, productName: string): void {
    alert(`${productName} has been added to your cart!`);
    // Here you would typically dispatch an action or call a cart service
  }

  // Helper to get stock status class and text
  getStockStatus(stock: number): { class: string; text: string } {
    if (stock <= 0) return { class: 'out-of-stock', text: 'Out of Stock' };
    if (stock < 10) return { class: 'low-stock', text: `Only ${stock} left` };
    return { class: 'in-stock', text: 'In Stock' };
  }
}