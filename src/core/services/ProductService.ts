import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/iproduct';
import { PaginationResult } from '../models/pagination-result';
import { environment } from '../../environments/environment.development';
import { AddProduct } from '../models/add-product';
import { DeleteProductResponse } from '../models/delete-product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);


  getProducts(
    page: number = 1,
    pageSize: number = 10,
    search: string = '',
    minPrice?: number,
    maxPrice?: number
  ): Observable<PaginationResult<Product>> {

    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    if (minPrice != null) {
      params = params.set('minPrice', minPrice);
    }

    if (maxPrice != null) {
      params = params.set('maxPrice', maxPrice);
    }

    return this.http.get<PaginationResult<Product>>(
      environment.baseURL + 'Products',
      { params }
    );
  }


  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${environment.baseURL + 'Products'}/${id}`);
  }





  addProduct(product: AddProduct) {
    return this.http.post(environment.baseURL + 'Products', product);
  }







  deleteProduct(id: number): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${environment.baseURL + 'Products'}/${id}`
    );
  }






  getSellerProducts() {
    return this.http.get<Product[]>(
      `${environment.baseURL}/seller-products`
    );

  }
}