import { Component, OnInit, inject, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders';
import { OrderStatusBadgeComponent } from '../order-status-badge/order-status-badge';
import { OrderStatus } from '../../../core/models/iorder';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, OrderStatusBadgeComponent],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetailsComponent {

  ordersService = inject(OrdersService);
  orderId = input.required<number>();
  order = this.ordersService.selectedOrder;

  constructor() {
    effect(() => {
      const id = this.orderId();
      if (id) {
        this.ordersService.getOrderById(id).subscribe();
      }
    });
  }

  isStepActive(step: OrderStatus): boolean {
    const order = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const current = this.order()?.status ?? 'Pending';
    return order.indexOf(current) >= order.indexOf(step);
  }

  cancel(): void {
    const id = this.order()?.id;
    if (id) this.ordersService.cancelOrder(id).subscribe();
  }
}