import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../shared/components/navbar/navbar";
import { Footer } from "../shared/components/footer/footer";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalService } from '../core/services/modal.service';
import { UserModalComponent } from '../feature/admin/users/user-modal/user-modal.component';
import { ProductModalComponent } from '../feature/admin/products/product-modal/product-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule, UserModalComponent, ProductModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  modalService   = inject(ModalService);

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  closeOnBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.modalService.close();
  }
}