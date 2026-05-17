import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/iproduct';
import { ProductService } from '../../core/services/ProductService';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.css']
})
export class DetailedProductComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);

  product: Product | null = null;
  productId!: number;

  // Quantity selector
  quantity: number = 1;

  // UI states
  isAddingToCart = false;
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' = 'success';
  private notificationTimeout: any;

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = Number(params.get('id'));
        this.getProductDetails();
      },
      error: (err) => console.error('Route error:', err)
    });
  }

  getProductDetails(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.product = response;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Product load error:', err)
    });
  }

  incrementQuantity(): void {
    if (this.product && this.quantity < (this.product.stock || 99)) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product) return;
    if (this.isAddingToCart) return;

    this.isAddingToCart = true;
    this.cdr.detectChanges();

    this.cartService.addToCart(this.product.id, this.quantity).subscribe({
      next: () => {
        this.showNotification(
          `Added ${this.quantity} × "${this.product!.title}" to cart`,
          'success'
        );
        this.isAddingToCart = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Add to cart error:', err);
        this.showNotification('Failed to add product. Please try again.', 'error');
        this.isAddingToCart = false;
        this.cdr.detectChanges();
      }
    });
  }

  private showNotification(message: string, type: 'success' | 'error'): void {
    if (this.notificationTimeout) clearTimeout(this.notificationTimeout);

    this.notificationMessage = message;
    this.notificationType = type;
    this.cdr.detectChanges();

    this.notificationTimeout = setTimeout(() => {
      this.notificationMessage = null;
      this.cdr.detectChanges();
    }, 3000);
  }
}