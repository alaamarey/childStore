import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IProduct } from '../models/iproduct';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);


  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(environment.baseURL + 'Products');
  }

}
