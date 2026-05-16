import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../core/services/ProductService';
import { AddProduct } from '../../core/models/add-product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css']
})
export class AddProductComponent {

  private productService = inject(ProductService);

  isLoading: boolean = false;

  successMessage: string = '';

  product: AddProduct = {

    id: 0,

    title: '',

    price: 0,

    description: '',

    image: '',

    stock: 0,

    rate: 0,

    ratingCount: 0,

    categoryName: ''

  };

  addProduct() {

    this.isLoading = true;

    this.productService.addProduct(this.product)
      .subscribe({

        next: (response) => {

          console.log(response);

          this.isLoading = false;

          this.successMessage = 'Product Added Successfully';

          this.resetForm();

        },

        error: (err) => {

          console.log(err);

          this.isLoading = false;

        }

      });

  }

  resetForm() {

    this.product = {

      id: 0,

      title: '',

      price: 0,

      description: '',

      image: '',

      stock: 0,

      rate: 0,

      ratingCount: 0,

      categoryName: ''

    };

  }

}