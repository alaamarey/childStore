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
  message: string = '';
messageType: 'success' | 'error' | '' = '';

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

    // update total بتاع item
    item.total = item.quantity * item.unitPrice;

    // update cart total
    this.cart.total = this.cart.items.reduce(
      (sum: number, x: any) => sum + x.total,
      0
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
  const cartId = this.cart.id; 

  this.cartService.removeFromCart(cartId, item.productId)
    .subscribe({
      next: (res) => {
        console.log(res); 

        this.cart.items = this.cart.items.filter(
          x => x.productId !== item.productId
        );

        this.cart.total = this.cart.items.reduce(
          (sum: number, x: any) => sum + x.total,
          0
        );
      },
      error: (err) => {
        console.log("Delete error:", err);
      }
    });
}
checkout() {
  console.log("checkout clicked");
}
getTotalPrice(): number {
  return this.cart.items.reduce((sum: number, item: any) => {
    return sum + (item.unitPrice * item.quantity);
  }, 0);
}
}