import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddProductPayload, Product, UpdateStockPayload } from '../models/iproduct';
import { SellerProfile } from '../models/seller-profile';
import { environment } from '../../environments/environment.development';
import { Order, OrderSummary } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  // Use the provided JWT token - in real app, this would come from login
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQxN2Q4NThkLTgxOGQtNGMwYy1hMDI5LTYwYWEzMTliYzg4YiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Im1hcmlhbS5zZWxsZXJAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik1hcmlhbSBIYXNzYW4iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTZWxsZXIiLCJleHAiOjE3Nzk1NzQ5NjYsImlzcyI6IkVDb21tZXJjZUFQSSIsImF1ZCI6IkVDb21tZXJjZUNsaWVudCJ9.m3jr0HWhu98KUoObPKPAJ-JUGn0Yl0c15yicDwRnwXc'
  constructor(private http: HttpClient) { }





  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
      'accept': '*/*'
    });
  }




  //Get all products for seller
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.baseURL}Seller/my-products`, {
      headers: this.getHeaders()
    });
  }






  //Get specific product by ID
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${environment.baseURL}Seller/my-products/${productId}`, {
      headers: this.getHeaders()
    });
  }





  //Add new product
  addProduct(product: AddProductPayload): Observable<Product> {
    return this.http.post<Product>(`${environment.baseURL}Seller/products`, product, {
      headers: this.getHeaders()
    });
  }





  //Update product
  updateProduct(productId: number, product: AddProductPayload): Observable<string> {
    return this.http.put<string>(`${environment.baseURL}Seller/products/${productId}`, product, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }



  //Delete product
  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseURL}Seller/products/${productId}`, {
      headers: this.getHeaders()
    });
  }






  //Update product stock
  updateProductStock(productId: number, stock: number): Observable<void> {
    const payload: UpdateStockPayload = { stock };
    return this.http.patch<void>(`${environment.baseURL}Seller/products/${productId}/stock`, payload, {
      headers: this.getHeaders()
    });
  }





  //Get all orders for seller
  getAllOrders(): Observable<OrderSummary[]> {
    return this.http.get<OrderSummary[]>(`${environment.baseURL}Seller/orders`, {
      headers: this.getHeaders()
    });
  }



  //Get specific order by ID
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${environment.baseURL}Seller/orders/${orderId}`, {
      headers: this.getHeaders()
    });
  }



  //Get seller profile
  getSellerProfile(): Observable<SellerProfile> {
    return this.http.get<SellerProfile>(`${environment.baseURL}Seller/profile`, {
      headers: this.getHeaders()
    });
  }
}