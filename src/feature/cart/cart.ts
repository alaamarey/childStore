import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { MyCart } from '../../core/models/my-cart';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {

  cart!: MyCart;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  loading = false;
  shippingAddress = '';
  paymentMethod = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getMyCart().subscribe({
      next: (data) => { this.cart = data; },
      error: (err) => console.log(err)
    });
  }

  clearCart() {
    this.cartService.clearCart(this.cart.id).subscribe(() => {
      this.loadCart();
    });
  }

  increaseQty(item: any) {
    item.quantity++;
    this.updateItem(item);
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      item.total = item.quantity * item.unitPrice;
      this.cart.total = this.cart.items.reduce(
        (sum: number, x: any) => sum + x.total, 0
      );
    }
  }

  updateItem(item: any) {
    this.cartService.updateItem(
      this.cart.id,
      item.productId,
      item.quantity
    ).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.log(err)
    });
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(this.cart.id, item.productId)
      .subscribe({
        next: () => {
          this.cart.items = this.cart.items.filter(
            x => x.productId !== item.productId
          );
          this.cart.total = this.cart.items.reduce(
            (sum: number, x: any) => sum + x.total, 0
          );
        },
        error: (err) => console.log('Delete error:', err)
      });
  }

  getTotalPrice(): number {
    return this.cart.items.reduce((sum: number, item: any) => {
      return sum + (item.unitPrice * item.quantity);
    }, 0);
  }

  checkout() {
    if (!this.shippingAddress.trim()) {
      this.message = 'Please enter a shipping address';
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
      customerPhone: ''
    };

    this.loading = true;

    this.http.post(
      'http://ecommercepro.runasp.net/api/Order/checkout',
      body
    ).subscribe({
      next: () => {
        this.loading = false;
        this.message = 'Order placed successfully!';
        this.messageType = 'success';
        setTimeout(() => {
          this.router.navigate(['/orders']);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.message = 'Failed to place order. Please try again.';
        this.messageType = 'error';
        console.log(err);
      }
    });
  }
}