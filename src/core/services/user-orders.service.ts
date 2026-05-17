// user-orders.service.ts

import {
  Injectable,
  inject,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap,
  finalize
} from 'rxjs';

import {
  IUserOrder
} from '../models/user-orders.model';

@Injectable({
  providedIn: 'root'
})

export class UserOrdersService {

  private http =
    inject(HttpClient);

  private readonly API_URL =
    'http://ecommercepro.runasp.net/api';

  // =========================
  // SIGNALS
  // =========================

  userOrders =
    signal<IUserOrder[]>([]);

  isLoading =
    signal(false);

  // =========================
  // GET USER ORDERS
  // =========================

  getUserOrders():
  Observable<IUserOrder[]> {

    this.isLoading.set(true);

    return this.http
      .get<IUserOrder[]>(
        `${this.API_URL}/Order/my-orders`
      )
      .pipe(

        tap((orders) => {

          this.userOrders.set(
            orders
          );

        }),

        finalize(() => {

          this.isLoading.set(false);

        })

      );
  }

  // =========================
  // GET ORDER BY ID
  // =========================

  getOrderById(
    id: number
  ): Observable<IUserOrder> {

    return this.http.get<IUserOrder>(
      `${this.API_URL}/Order/${id}`
    );

  }

}