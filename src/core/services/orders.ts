import {
  Injectable,
  inject,
  signal,
  computed,
} from '@angular/core';

import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';

import {
  Observable,
  tap,
  catchError,
  throwError,
  finalize,
} from 'rxjs';

import {
  IOrder,
  IOrdersResponse,
  IUpdateOrderStatus,
  IOrderFilters,
  OrderStatus,
} from '../models/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'http://ecommercepro.runasp.net/api';

  orders = signal<IOrder[]>([]);

  selectedOrder = signal<IOrder | null>(null);

  isLoading = signal(false);

  error = signal<string | null>(null);

  totalCount = signal(0);

  pendingOrders = computed(() =>
    this.orders().filter(
      (o) => o.status === 'Pending'
    )
  );

  cancelledOrders = computed(() =>
    this.orders().filter(
      (o) => o.status === 'Cancelled'
    )
  );

  // =========================
  // GET ALL ORDERS
  // =========================

  getAllOrders(
    filters?: IOrderFilters
  ): Observable<IOrdersResponse> {

    this.isLoading.set(true);

    this.error.set(null);

    let params = new HttpParams();

    if (filters?.status) {
      params = params.set(
        'status',
        filters.status
      );
    }

    if (filters?.page) {
      params = params.set(
        'page',
        filters.page
      );
    }

    if (filters?.pageSize) {
      params = params.set(
        'pageSize',
        filters.pageSize
      );
    }

    return this.http
      .get<IOrdersResponse>(
        `${this.API_URL}/Order`,
        { params }
      )
      .pipe(

        tap((res: any) => {

          this.orders.set(res.data);

          this.totalCount.set(
            res.totalCount
          );

        }),

        catchError((err) => {

          this.error.set(
            err.error?.message ||
            'Failed to load orders'
          );

          return throwError(() => err);

        }),

        finalize(() =>
          this.isLoading.set(false)
        )
      );
  }

  // =========================
  // GET MY ORDERS
  // =========================

  getMyOrders(): Observable<IOrder[]> {

    this.isLoading.set(true);

    this.error.set(null);

    return this.http
      .get<IOrder[]>(
        `${this.API_URL}/Order/my-orders`
      )
      .pipe(

        tap((orders) => {

          this.orders.set(orders);

          if (orders.length > 0) {

            this.selectedOrder.set(
              orders[0]
            );

          }

        }),

        catchError((err) => {

          this.error.set(
            err.error?.message ||
            'Failed to load orders'
          );

          return throwError(() => err);

        }),

        finalize(() =>
          this.isLoading.set(false)
        )
      );
  }

  // =========================
  // GET ORDER BY ID
  // =========================

  getOrderById(
    id: number
  ): Observable<IOrder> {

    this.isLoading.set(true);

    this.error.set(null);

    return this.http
      .get<IOrder>(
        `${this.API_URL}/Order/${id}`
      )
      .pipe(

        tap((order) =>
          this.selectedOrder.set(order)
        ),

        catchError((err) => {

          this.error.set(
            err.error?.message ||
            'Order not found'
          );

          return throwError(() => err);

        }),

        finalize(() =>
          this.isLoading.set(false)
        )
      );
  }

  // =========================
  // CANCEL ORDER
  // =========================

  cancelOrder(
    orderId: number
  ): Observable<void> {

    this.isLoading.set(true);

    return this.http
      .put<void>(
        `${this.API_URL}/Order/${orderId}/cancel`,
        {}
      )
      .pipe(

        tap(() => {

          this.orders.update((orders) =>
            orders.map((o) =>
              o.id === orderId
                ? {
                    ...o,
                    status:
                      'Cancelled' as OrderStatus,
                  }
                : o
            )
          );

        }),

        finalize(() =>
          this.isLoading.set(false)
        )
      );
  }

  // =========================
  // UPDATE STATUS
  // =========================

  updateOrderStatus(
    orderId: number,
    body: IUpdateOrderStatus
  ): Observable<void> {

    return this.http.put<void>(
      `${this.API_URL}/Order/${orderId}/status`,
      body
    );
  }
}