import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { MyCart } from '../../core/models/my-cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html'
})
export class CartComponent implements OnInit {

  cart!: MyCart;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getMyCart().subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => console.log(err)
    });
  }

  removeItem(productId: number) {
    this.cartService.deleteItem(this.cart.id, productId).subscribe(() => {
      this.loadCart();
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
      this.updateItem(item);
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
}