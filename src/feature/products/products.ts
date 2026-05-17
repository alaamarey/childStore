import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/iproduct';
import { ProductService } from '../../core/services/ProductService';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private cdr = inject(ChangeDetectorRef);

  // Products & pagination
  products: Product[] = [];
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 10;
  search: string = '';
  minPrice?: number;
  maxPrice?: number;
  totalPages: number = 0;
  loading: boolean = false;
  errorMessage: string | null = null;

  // UI feedback
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' = 'success';
  private notificationTimeout: any;

  // Track which products are currently being added
  addingProductIds = new Set<number>();

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.loading = true;
    this.errorMessage = null;
    this.cdr.markForCheck();

    this.productService.getProducts(
      this.page,
      this.pageSize,
      this.search,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.totalCount;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
        setTimeout(() => {
          if (this.errorMessage) {
            this.errorMessage = null;
            this.cdr.markForCheck();
          }
        }, 3000);
      }
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.getProducts();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getProducts();
    }
  }

  applyFilters(): void {
    this.page = 1;
    this.getProducts();
  }

  addToCart(product: Product): void {
    // Prevent multiple clicks for the same product
    if (this.addingProductIds.has(product.id)) {
      return;
    }

    this.addingProductIds.add(product.id);
    this.cdr.markForCheck();

    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => {
        this.showNotification(`${product.title} added to cart`, 'success');
        this.addingProductIds.delete(product.id);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);

        console.error('Add to cart error:', err);
        this.showNotification('Failed to add product. Please try again.', 'error');
        this.addingProductIds.delete(product.id);
        this.cdr.markForCheck();
      }
    });
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    // Clear any existing timeout
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    this.notificationMessage = message;
    this.notificationType = type;
    this.cdr.markForCheck();

    this.notificationTimeout = setTimeout(() => {
      this.notificationMessage = null;
      this.cdr.markForCheck();
    }, 3000);
  }
}