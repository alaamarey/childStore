// user-orders.ts

import {
  Component,
  OnInit,
  inject,
  signal,
  computed
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  UserOrdersService
} from '../../core/services/user-orders.service';

import {
  IUserOrder
} from '../../core/models/user-orders.model';

@Component({
  selector: 'app-user-orders',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './user-orders.html',

  styleUrl: './user-orders.css'
})

export class UserOrdersComponent
implements OnInit {

  // =========================
  // SERVICES
  // =========================

  private userOrdersService =
    inject(UserOrdersService);

  // =========================
  // SIGNALS
  // =========================

  orders =
    this.userOrdersService.userOrders;

  isLoading =
    this.userOrdersService.isLoading;

  selectedOrder =
    signal<IUserOrder | null>(null);

  // =========================
  // COMPUTED
  // =========================

  totalOrders = computed(() =>
    this.orders().length
  );

  completedOrders = computed(() =>
    this.orders().filter(
      o => o.status === 3
    ).length
  );

  pendingOrders = computed(() =>
    this.orders().filter(
      o => o.status === 0
    ).length
  );

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.loadOrders();

  }

  // =========================
  // LOAD ORDERS
  // =========================

  loadOrders(): void {

    this.userOrdersService
      .getUserOrders()
      .subscribe({

        next: (orders) => {

          // لو فيه أوردرات
          if (orders.length > 0) {

            // افتح أول أوردر تلقائي
            this.loadOrderDetails(
              orders[0].id
            );

          }

        },

        error: (err) => {

          console.error(
            'Failed to load orders',
            err
          );

        }

      });

  }

  // =========================
  // LOAD DETAILS
  // =========================

  loadOrderDetails(
    orderId: number
  ): void {

    this.isLoading.set(true);

    this.userOrdersService
      .getOrderById(orderId)
      .subscribe({

        next: (fullOrder) => {

          this.selectedOrder.set(
            fullOrder
          );

          this.isLoading.set(false);

        },

        error: (err) => {

          console.error(
            'Failed to load order details',
            err
          );

          this.isLoading.set(false);

        }

      });

  }

  // =========================
  // SELECT ORDER
  // =========================

  selectOrder(
    order: IUserOrder
  ): void {

    this.loadOrderDetails(
      order.id
    );

  }

  // =========================
  // STATUS TEXT
  // =========================

  getStatus(
    status: number
  ): string {

    switch (status) {

      case 0:
        return 'Pending';

      case 1:
        return 'Processing';

      case 2:
        return 'Shipped';

      case 3:
        return 'Delivered';

      case 4:
        return 'Cancelled';

      default:
        return 'Unknown';
    }

  }

  // =========================
  // STATUS ICON
  // =========================

  getStatusIcon(
    status: number
  ): string {

    switch (status) {

      case 0:
        return '🕒';

      case 1:
        return '⚙️';

      case 2:
        return '🚚';

      case 3:
        return '✅';

      case 4:
        return '❌';

      default:
        return '📦';
    }

  }

  // =========================
  // PROGRESS
  // =========================

  getOrderProgress(
    status: number
  ): number {

    switch (status) {

      case 0:
        return 25;

      case 1:
        return 50;

      case 2:
        return 75;

      case 3:
        return 100;

      case 4:
        return 100;

      default:
        return 0;
    }

  }

  // =========================
  // FORMAT PRICE
  // =========================

  formatPrice(
    amount: number
  ): string {

    return `${amount} EGP`;

  }

  // =========================
  // CANCEL ORDER
  // =========================

  cancelOrder(
    orderId: number
  ): void {

    const confirmed =
      confirm(
        'Are you sure you want to cancel this order?'
      );

    if (!confirmed) return;

    console.log(
      'Cancel Order:',
      orderId
    );

  }

  // =========================
  // CAN CANCEL
  // =========================

  canCancelOrder(
    status: number
  ): boolean {

    return (
      status === 0 ||
      status === 1
    );

  }

  // =========================
  // TRACK BY
  // =========================

  trackByOrderId(
    index: number,
    order: IUserOrder
  ): number {

    return order.id;

  }

}