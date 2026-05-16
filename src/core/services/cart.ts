import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyCart } from '../models/my-cart';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = environment.baseURL + 'Cart';

  constructor(private http: HttpClient) {}

  getMyCart(): Observable<MyCart> {
    return this.http.get<MyCart>(`${this.baseUrl}/MyCart`);
  }

  addToCart(productId: number, quantity: number) {
    return this.http.post(`${this.baseUrl}/Add`, {
      productId,
      quantity
    });
  }

  deleteItem(cartId: number, productId: number) {
    return this.http.delete(`${this.baseUrl}/${cartId}/${productId}`);
  }

  clearCart(cartId: number) {
    return this.http.delete(`${this.baseUrl}/Clear/${cartId}`);
  }

  updateItem(cartId: number, productId: number, quantity: number) {
    return this.http.put(`${this.baseUrl}/update`, null, {
      params: {
        cartid: cartId,
        productid: productId,
        quantity
      }
    });
  }
}