import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/services/cart';
import { MyCart } from '../../core/models/my-cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  private http = inject(HttpClient);

  cart: MyCart | null = null;
  loading = true;
  updatingItem = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  // Checkout fields
  shippingAddress = '';
  paymentMethod = 0; // 0 = Cash on Delivery, 1 = Credit Card, 2 = Online Payment

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getMyCart().subscribe({
      next: (data) => {
        this.cart = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load cart', err);
        this.message = 'Could not load your cart. Please try again.';
        this.messageType = 'error';
        this.loading = false;
      }
    });
  }

  increaseQty(item: any): void {
    if (!this.cart) return;
    const newQty = item.quantity + 1;
    this.updateQuantity(item, newQty);
  }

  decreaseQty(item: any): void {
    if (!this.cart) return;
    if (item.quantity <= 1) return;
    const newQty = item.quantity - 1;
    this.updateQuantity(item, newQty);
  }

  private updateQuantity(item: any, newQuantity: number): void {
    if (!this.cart) return;
    this.updatingItem = true;
    this.cartService.updateItem(this.cart.id, item.productId, newQuantity).subscribe({
      next: () => {
        // Update local cart immediately for smooth UI
        item.quantity = newQuantity;
        this.updatingItem = false;
        this.message = 'Cart updated';
        this.messageType = 'success';
        setTimeout(() => (this.message = ''), 2000);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.message = 'Failed to update quantity.';
        this.messageType = 'error';
        this.updatingItem = false;
      }
    });
  }

  removeItem(item: any): void {
    if (!this.cart) return;
    if (confirm(`Remove "${item.productName}" from cart?`)) {
      this.cartService.removeFromCart(this.cart.id, item.productId).subscribe({
        next: () => {
          this.cart!.items = this.cart!.items.filter(i => i.productId !== item.productId);
          this.message = 'Item removed';
          this.messageType = 'success';
          setTimeout(() => (this.message = ''), 2000);
        },
        error: (err) => {
          console.error('Remove failed', err);
          this.message = 'Failed to remove item.';
          this.messageType = 'error';
        }
      });
    }
  }

  getTotalPrice(): number {
    if (!this.cart) return 0;
    return this.cart.items.reduce((sum, item: any) => sum + (item.unitPrice * item.quantity), 0);
  }

  checkout(): void {
    if (!this.cart || this.cart.items.length === 0) {
      this.message = 'Your cart is empty.';
      this.messageType = 'error';
      return;
    }
    if (!this.shippingAddress.trim()) {
      this.message = 'Please enter a shipping address.';
      this.messageType = 'error';
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const body = {
      cartId: this.cart.id,
      userId: user.userId,
      paymentMethod: this.paymentMethod,
      shippingAddress: this.shippingAddress,
      customerName: user.fullName,
      customerEmail: user.email,
      customerPhone: user.phone || ''
    };

    this.loading = true;
    this.http.post('http://ecommercepro.runasp.net/api/Order/checkout', body).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Order placed successfully! Redirecting...';
        this.messageType = 'success';
        setTimeout(() => this.router.navigate(['/orders']), 1500);
      },
      error: (err) => {
        this.loading = false;
        this.message = 'Failed to place order. Please try again.';
        this.messageType = 'error';
        console.error(err);
      }
    });
  }
}