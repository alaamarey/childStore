import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalService } from '../../../../core/services/modal.service';
import { AdminService } from '../../../../core/services/admin';

import { IUser } from '../../../../core/models/admin';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],

  template: `
    <div class="modal-header">
      <h2>
        {{ modalService.isEditing() ? 'Edit User' : 'Add User' }}
      </h2>

      <button
        class="close-btn"
        (click)="modalService.close()"
      >
        ✕
      </button>
    </div>

    <div class="modal-form">

      <div class="form-group">
        <label class="form-label">
          Full Name
        </label>

        <input
          class="form-input"
          [(ngModel)]="form.fullName"
          placeholder="e.g. Ahmed Ali"
        >
      </div>

      <div class="form-group">
        <label class="form-label">
          Email
        </label>

        <input
          class="form-input"
          type="email"
          [(ngModel)]="form.email"
          placeholder="email@example.com"
        >
      </div>

      <div class="form-group">
        <label class="form-label">
          Phone
        </label>

        <input
          class="form-input"
          [(ngModel)]="form.phoneNumber"
          placeholder="+20 1xx xxx xxxx"
        >
      </div>

      <div class="form-group">
        <label class="form-label">
          Role
        </label>

        <select
          class="form-input"
          [(ngModel)]="selectedRole"
        >
          <option value="Customer">
            Customer
          </option>

          <option value="Seller">
            Seller
          </option>

          <option value="Admin">
            Admin
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          Status
        </label>

        <select
          class="form-input"
          [(ngModel)]="form.status"
        >
          <option value="approved">
            Approved
          </option>

          <option value="pending">
            Pending
          </option>
        </select>
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
              : 'Add User'
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
      border:0.5px solid #e5e7eb;
      border-radius:10px;
      font-size:13px;
      color:#1a1a2e;
      background:#fafafa;
      outline:none;
      transition:border-color .2s, box-shadow .2s;
    }

    .form-input:focus{
      border-color:#7c3aed;
      box-shadow:0 0 0 3px rgba(124,58,237,.12);
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
export class UserModalComponent {

  modalService = inject(ModalService);
  adminService = inject(AdminService);

  selectedRole = 'Customer';

  form: Partial<IUser> & {
    status: 'approved' | 'pending'
  } = {
    fullName: '',
    email: '',
    phoneNumber: '',
    roles: ['Customer'],
    status: 'approved'
  };

  ngOnInit(): void {

    const data = this.modalService.modalData();

    if (data) {

      this.form = {
        ...data,

        roles: data.roles?.length
          ? data.roles
          : ['Customer'],

        status: data.isApproved
          ? 'approved'
          : 'pending'
      };

      this.selectedRole =
        this.form.roles?.[0] || 'Customer';
    }
  }

  save(): void {

    if (
      !this.form.fullName?.trim() ||
      !this.form.email?.trim()
    ) return;

    const payload: Partial<IUser> = {

      fullName:
        this.form.fullName,

      email:
        this.form.email,

      phoneNumber:
        this.form.phoneNumber ?? '',

      roles:
        [this.selectedRole],

      isApproved:
        this.form.status === 'approved'
    };

    if (this.modalService.isEditing()) {

      this.adminService
        .updateUser(this.form.id!, payload)
        .subscribe({

          next: () => {

            this.adminService.getUsers().subscribe();

            this.modalService.close();
          },

          error: () => {

            const updatedUsers =
              this.adminService
                .users()
                .map(user =>

                  user.id === this.form.id
                    ? { ...user, ...payload }
                    : user
                );

            this.adminService
              .setUsers(updatedUsers);

            this.modalService.close();
          }
        });

    } else {

      this.adminService
        .createUser(payload)
        .subscribe({

          next: () => {

            this.adminService.getUsers().subscribe();

            this.modalService.close();
          },

          error: () => {

            const newUser: IUser = {

              ...(payload as IUser),

              id: crypto.randomUUID(),

              isDeleted: false,

              online: false
            };

            this.adminService.setUsers([
              ...this.adminService.users(),
              newUser
            ]);

            this.modalService.close();
          }
        });
    }
  }
}