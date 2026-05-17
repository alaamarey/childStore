import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin';
import { ModalService } from '../../../core/services/modal.service';
import { IProduct } from '../../../core/models/admin';
import { ProductModalComponent } from './product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
  CommonModule,
  ProductModalComponent
],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  adminService = inject(AdminService);
  modalService = inject(ModalService);

  ngOnInit(): void {
    this.adminService.getProducts().subscribe();
  }

  get products(): IProduct[] {
    return this.adminService.products() ?? [];
  }

  openAdd(): void {
    this.modalService.open('product', {
      title: '', description: '', image: '', price: 0, stock: 0, categoryId: 1
    }, false);
  }

  openEdit(product: IProduct): void {
    this.modalService.open('product', { ...product }, true);
  }

  delete(id: number): void {
    this.adminService.deleteProduct(id).subscribe({
      next: () => this.adminService.setProducts(this.products.filter(p => p.id !== id)),
      error: () => this.adminService.setProducts(this.products.filter(p => p.id !== id))
    });
  }

  getStars(rate: number): string[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rate) ? 'star full' : i < rate ? 'star half' : 'star empty'
    );
  }
}