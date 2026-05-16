import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/iproduct';
import { ProductService } from '../../core/services/ProductService';
import { CartService } from '../../core/services/cart';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductComponent implements OnInit {

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products: Product[] = [];

  totalCount: number = 0;

  page: number = 1;
  pageSize: number = 10;

  search: string = '';

  minPrice?: number;
  maxPrice?: number;

  totalPages: number = 0;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {

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

        this.totalPages = Math.ceil(
          this.totalCount / this.pageSize
        );
      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  nextPage() {

    if (this.page < this.totalPages) {

      this.page++;

      this.getProducts();
    }
  }

  previousPage() {

    if (this.page > 1) {

      this.page--;

      this.getProducts();
    }
  }

  applyFilters() {

    this.page = 1;

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