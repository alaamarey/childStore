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
  private cdr = inject(ChangeDetectorRef);
  private cartService = inject(CartService);

  products: Product[] = [];
  totalCount: number = 0;
  page: number = 1;
  pageSize: number = 10;   // Standard pagination size
  search: string = '';
  minPrice?: number;
  maxPrice?: number;
  totalPages: number = 0;
  loading: boolean = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.getProducts();   // Automatically loads page 1
  }

  getProducts(): void {
    this.loading = true;
    this.errorMessage = null;
    this.cdr.markForCheck();   // Ensure loading indicator appears

    this.productService.getProducts(
      this.page,
      this.pageSize,
      this.search,
      this.minPrice,
      this.maxPrice
    ).subscribe({
      next: (response) => {
        console.log(response);

        this.products = response.data;
        this.totalCount = response.totalCount;
        this.page = response.page;
        this.pageSize = response.pageSize;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.loading = false;
        this.cdr.markForCheck();   // Update view with products
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
        // Auto-clear error after 3 seconds
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
      this.getProducts();   // Fetch next page
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getProducts();   // Fetch previous page
    }
  }

  applyFilters(): void {
    this.page = 1;          // Reset to first page when filtering
    this.getProducts();
  }
  addToCart(product: any) {

    this.cartService.getMyCart().subscribe({
      next: (cart) => {

        const existingItem = cart.items.find(
          (item: any) => item.productId === product.id
        );

        if (existingItem) {

          this.cartService.updateItem(
            cart.id,
            product.id,
            existingItem.quantity + 1
          ).subscribe(() => {
            console.log('Updated quantity');
          });

        } else {

          this.cartService.addToCart(product.id, 1).subscribe(() => {
            console.log('Added new item');
          });

        }

      }
    });

  }
}


