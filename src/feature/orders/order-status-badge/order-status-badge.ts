import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatus } from '../../../core/models/iorder';

@Component({
  selector: 'app-order-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status-badge.html',
  styleUrl: './order-status-badge.css',
})
export class OrderStatusBadgeComponent {
  status = input.required<OrderStatus>();
}