import {
  Component,
  OnInit,
  inject,
  input,
  effect,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { OrdersService } from '../../../core/services/orders';

@Component({
  selector: 'app-order-details',
  standalone: true,

  imports: [CommonModule],

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

        this.ordersService
          .getOrderById(id)
          .subscribe();

      }

    });

  }
}