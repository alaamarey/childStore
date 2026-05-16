import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);


  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.baseURL + 'Category');
  }


  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${environment.baseURL + 'Category'}/${id}`);
  }

}