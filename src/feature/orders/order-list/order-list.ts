import {
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { OrdersService } from '../../../core/services/orders';

import { OrderDetailsComponent } from '../order-details/order-details';

import { OrderStatusBadgeComponent } from '../order-status-badge/order-status-badge';

@Component({
  selector: 'app-order-list',
  standalone: true,

  imports: [
    CommonModule,
    OrderDetailsComponent,
    OrderStatusBadgeComponent,
  ],

  templateUrl: './order-list.html',
  styleUrl: './order-list.css',
})
export class OrderListComponent implements OnInit {

  ordersService = inject(OrdersService);

  selectedOrderId = signal<number>(1);

  ngOnInit(): void {
    this.ordersService
      .getMyOrders()
      .subscribe();
  }

  selectOrder(id: number) {

    this.selectedOrderId.set(id);

  }
}