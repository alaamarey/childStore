import { Component, input, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrdersService } from '../../../core/services/orders';

import { OrderStatus } from '../../../core/models/iorder';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-status.html',
  styleUrl: './order-status.css',
})
export class OrderStatusComponent {
  ordersService = inject(OrdersService);

  orderId = input.required<number>();

  statuses: OrderStatus[] = [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ];

  selectedStatus: OrderStatus = 'Processing';

  updateStatus() {
    this.ordersService
      .updateOrderStatus(this.orderId(), {
        status: this.selectedStatus,
      })
      .subscribe();
  }
}