import { Component, inject } from '@angular/core';
import { ProductService } from '../../core/services/ProductService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delete-product-component.html',
  styleUrl: './delete-product-component.css'
})
export class DeleteProductComponent {
  private productService = inject(ProductService);
  productId: number = 0;
  message: string = '';


  deleteProduct() {
    if (!this.productId) {
      this.message = 'Enter valid Id ';
      return;
    }


    this.productService.deleteProduct(this.productId).subscribe({
      next: (response) => {
        this.message = response.message;
      },


      error: (err) => {
        this.message = 'Error when delete Product';
        console.log(err);
      }

    });

  }

}