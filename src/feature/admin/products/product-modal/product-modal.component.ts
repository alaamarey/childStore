import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalService } from '../../../../core/services/modal.service';
import { AdminService } from '../../../../core/services/admin';

import { IProduct } from '../../../../core/models/admin';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
    <div class="modal-header">
      <h2>
        {{
          modalService.isEditing()
            ? 'Edit Product'
            : 'Add Product'
        }}
      </h2>

      <button
        class="close-btn"
        (click)="modalService.close()"
      >
        ✕
      </button>
    </div>

    <div class="modal-form">

      <div class="form-row">

        <div class="form-group">
          <label class="form-label">
            Title
          </label>

          <input
            class="form-input"
            [(ngModel)]="form.title"
            placeholder="Product title"
          >
        </div>

        <div class="form-group">
          <label class="form-label">
            Price ($)
          </label>

          <input
            class="form-input"
            type="number"
            [(ngModel)]="form.price"
            placeholder="0.00"
          >
        </div>

      </div>

      <div class="form-group">
        <label class="form-label">
          Description
        </label>

        <textarea
          class="form-input form-textarea"
          [(ngModel)]="form.description"
          placeholder="Product description"
        ></textarea>
      </div>

      <div class="form-row">

        <div class="form-group">
          <label class="form-label">
            Stock
          </label>

          <input
            class="form-input"
            type="number"
            [(ngModel)]="form.stock"
            placeholder="0"
          >
        </div>

        <div class="form-group">
          <label class="form-label">
            Category ID
          </label>

          <input
            class="form-input"
            type="number"
            [(ngModel)]="form.categoryId"
            placeholder="1"
          >
        </div>

      </div>

      <div class="form-group">
        <label class="form-label">
          Image URL
        </label>

        <input
          class="form-input"
          [(ngModel)]="form.image"
          placeholder="https://..."
        >
      </div>

      <div class="modal-actions">

        <button
          class="cancel-btn"
          (click)="modalService.close()"
        >
          Cancel
        </button>

        <button
          class="save-btn"
          (click)="save()"
        >
          {{
            modalService.isEditing()
              ? 'Save Changes'
              : 'Add Product'
          }}
        </button>

      </div>
    </div>
  `,

  styles: [`
    .modal-header{
      display:flex;
      justify-content:space-between;
      align-items:center;
      margin-bottom:20px;
    }

    .modal-header h2{
      font-size:18px;
      font-weight:700;
      color:#1a1a2e;
    }

    .close-btn{
      background:none;
      border:none;
      font-size:20px;
      cursor:pointer;
      color:#9ca3af;
    }

    .close-btn:hover{
      color:#1a1a2e;
    }

    .modal-form{
      display:flex;
      flex-direction:column;
      gap:14px;
    }

    .form-row{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:12px;
    }

    .form-group{
      display:flex;
      flex-direction:column;
    }

    .form-label{
      font-size:12px;
      font-weight:600;
      color:#6b7280;
      margin-bottom:4px;
    }

    .form-input{
      padding:9px 12px;
      border:.5px solid #e5e7eb;
      border-radius:10px;
      font-size:13px;
      color:#1a1a2e;
      background:#fafafa;
      outline:none;
      font-family:inherit;
      transition:border-color .2s, box-shadow .2s;
    }

    .form-input:focus{
      border-color:#7c3aed;
      box-shadow:0 0 0 3px rgba(124,58,237,.12);
    }

    .form-textarea{
      resize:vertical;
      min-height:80px;
    }

    .modal-actions{
      display:flex;
      gap:10px;
      margin-top:6px;
    }

    .cancel-btn{
      flex:1;
      padding:10px;
      border-radius:12px;
      font-size:13px;
      font-weight:600;
      cursor:pointer;
      border:.5px solid #e5e7eb;
      background:#f9fafb;
      color:#6b7280;
    }

    .save-btn{
      flex:2;
      padding:10px;
      border-radius:12px;
      font-size:13px;
      font-weight:600;
      cursor:pointer;
      border:none;
      background:#7c3aed;
      color:white;
    }

    .save-btn:hover{
      background:#6d28d9;
    }
  `]
})
export class ProductModalComponent {

  modalService = inject(ModalService);
  adminService = inject(AdminService);

  form: Partial<IProduct> = {
    title: '',
    description: '',
    image: '',
    price: 0,
    stock: 0,
    categoryId: 1
  };

  ngOnInit(): void {

    const data = this.modalService.modalData();

    if (data) {

      this.form = {
        ...data
      };
    }
  }

  save(): void {

    if (
      !this.form.title?.trim() ||
      !this.form.price
    ) return;

    if (this.modalService.isEditing()) {

      this.adminService
        .updateProduct(this.form.id!, this.form)
        .subscribe({

          next: () => {

            this.adminService
              .getProducts()
              .subscribe();

            this.modalService.close();
          },

          error: () => {

            const updatedProducts =
              this.adminService
                .products()
                .map(product =>

                  product.id === this.form.id
                    ? { ...product, ...this.form }
                    : product
                );

            this.adminService
              .setProducts(updatedProducts);

            this.modalService.close();
          }
        });

    } else {

      this.adminService
        .createProduct(this.form)
        .subscribe({

          next: () => {

            this.adminService
              .getProducts()
              .subscribe();

            this.modalService.close();
          },

          error: () => {

            const newProduct: IProduct = {

              ...(this.form as IProduct),

              id: Date.now(),

              rate: 0,

              ratingCount: 0
            };

            this.adminService.setProducts([
              ...this.adminService.products(),
              newProduct
            ]);

            this.modalService.close();
          }
        });
    }
  }
}