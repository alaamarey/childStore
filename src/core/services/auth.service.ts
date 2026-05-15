import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseURL + 'Auth';

  private userSubject = new BehaviorSubject<User | null>(this.getUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(data: Login): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, data);
  }

  register(data: Register): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/register`,
      data,
      { responseType: 'text' } 
    );
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
    this.userSubject.next(user);
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}