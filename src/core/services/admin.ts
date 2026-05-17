import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { IUser, IProduct, IBanner, IStats, ISeller } from '../models/admin';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private http = inject(HttpClient);
  private API = 'http://ecommercepro.runasp.net/api/Admin';

  users          = signal<IUser[]>([]);
  products       = signal<IProduct[]>([]);
  banners        = signal<IBanner[]>([]);
  sellers        = signal<ISeller[]>([]);
  pendingSellers = signal<ISeller[]>([]);
  stats          = signal<IStats | null>(null);
  loading        = signal(false);

  // ================= REFRESH =================

  refreshAll() {
    this.getStats().subscribe();
    this.getUsers().subscribe();
    this.getPendingSellers().subscribe();
  }

  // ================= USERS =================

  getUsers(): Observable<IUser[]> {
    this.loading.set(true);
    return this.http
      .get<IUser[]>(`${this.API}/users`)
      .pipe(
        tap((res) => {
          this.users.set(res);
          this.loading.set(false);
        })
      );
  }

  setUsers(list: IUser[]): void {
    this.users.set(list);
  }

  createUser(body: Partial<IUser>): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.API}/users`, body)
      .pipe(
        tap(() => this.refreshAll())
      );
  }

  updateUser(userId: string, body: Partial<IUser>): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.API}/users/${userId}`, body)
      .pipe(
        tap(() => this.refreshAll())
      );
  }

  approveUser(userId: string, isApproved: boolean) {
    return this.http.put(
      `${this.API}/users/approve`,
      { userId, isApproved, isDeleted: false }
    ).pipe(
      tap(() => this.refreshAll())
    );
  }

  deleteUser(userId: string): Observable<string> {
    return this.http.delete(
      `${this.API}/users/${userId}`,
      { responseType: 'text' }
    ).pipe(
      tap(() => this.refreshAll())
    );
  }

  // ================= PRODUCTS =================

  getProducts(): Observable<IProduct[]> {
    this.loading.set(true);
    return this.http
      .get<IProduct[]>(`${this.API}/products`)
      .pipe(
        tap((res) => {
          this.products.set(res);
          this.loading.set(false);
        })
      );
  }

  setProducts(list: IProduct[]): void {
    this.products.set(list);
  }

  createProduct(body: Partial<IProduct>): Observable<IProduct> {
    return this.http
      .post<IProduct>(`${this.API}/products`, body)
      .pipe(
        tap(() => this.refreshAll())
      );
  }

  updateProduct(id: number, body: Partial<IProduct>): Observable<IProduct> {
    return this.http
      .put<IProduct>(`${this.API}/products/${id}`, body)
      .pipe(
        tap(() => this.refreshAll())
      );
  }

  deleteProduct(id: number): Observable<string> {
    return this.http.delete(
      `${this.API}/products/${id}`,
      { responseType: 'text' }
    ).pipe(
      tap(() => this.refreshAll())
    );
  }

  // ================= BANNERS =================

  getBanners(): Observable<IBanner[]> {
    return this.http
      .get<IBanner[]>(`${this.API}/banners`)
      .pipe(tap((res) => this.banners.set(res)));
  }

  createBanner(body: IBanner) {
    return this.http.post(`${this.API}/banners`, body).pipe(
      tap(() => this.getBanners().subscribe())
    );
  }

  updateBanner(body: IBanner) {
    return this.http.put(`${this.API}/banners/${body.id}`, body).pipe(
      tap(() => this.getBanners().subscribe())
    );
  }

  deleteBanner(id: number) {
    return this.http.delete(`${this.API}/banners/${id}`).pipe(
      tap(() => this.getBanners().subscribe())
    );
  }

  // ================= STATS =================

  getStats(): Observable<IStats> {
    return this.http
      .get<IStats>(`${this.API}/stats`)
      .pipe(tap((res) => this.stats.set(res)));
  }

  // ================= SELLERS =================

  getPendingSellers(): Observable<ISeller[]> {
    return this.http
      .get<ISeller[]>(`${this.API}/pending-sellers`)
      .pipe(tap((res) => this.pendingSellers.set(res)));
  }

  getSellers(): Observable<ISeller[]> {
    return this.http
      .get<ISeller[]>(`${this.API}/sellers`)
      .pipe(tap((res) => this.sellers.set(res)));
  }

  approveSeller(id: string) {
    return this.http.put(`${this.API}/sellers/${id}/approve`, {}).pipe(
      tap(() => this.refreshAll())
    );
  }

  rejectSeller(id: string) {
    return this.http.put(`${this.API}/sellers/${id}/reject`, {}).pipe(
      tap(() => this.refreshAll())
    );
  }
}