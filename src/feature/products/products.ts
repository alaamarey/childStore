import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/models/iproduct';
import { ProductService } from '../../core/services/ProductService';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductComponent implements OnInit {

  private productService = inject(ProductService);


  @Input() product: any;

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




}