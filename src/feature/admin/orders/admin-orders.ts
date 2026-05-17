import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders';
import { IOrder, OrderStatus } from '../../../core/models/iorder';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css'
})
export class AdminOrdersComponent implements OnInit {

  ordersService = inject(OrdersService);
  selectedOrderId: number | null = null;

  selectedOrder = computed(() => {
    if (!this.selectedOrderId) return null;
    return this.ordersService.orders().find(o => o.id === this.selectedOrderId) ?? null;
  });

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe((res: any) => {
      if (res.data?.length > 0) {
        this.selectedOrderId = res.data[0].id;
      }
    });
  }

  selectOrder(id: number) {
    this.selectedOrderId = id;
  }

  changeStatus(id: number, event: Event) {
    const value = (event.target as HTMLSelectElement).value as OrderStatus;
    this.ordersService.updateOrderStatus(id, { status: value }).subscribe(() => {
      this.ordersService.getAllOrders().subscribe();
    });
  }

  isStepActive(step: OrderStatus): boolean {
    const order = this.selectedOrder();
    if (!order) return false;
    const steps: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = steps.indexOf(order.status as OrderStatus);
    const stepIndex = steps.indexOf(step);
    return stepIndex <= currentIndex;
  }
}