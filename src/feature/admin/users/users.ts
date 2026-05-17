import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin';
import { ModalService } from '../../../core/services/modal.service';
import { IUser } from '../../../core/models/admin';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
  CommonModule,
  UserModalComponent
],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent implements OnInit {
  adminService = inject(AdminService);
  modalService = inject(ModalService);

  ngOnInit(): void {
    this.adminService.getUsers().subscribe();
  }

  get users(): IUser[] {
    return (this.adminService.users() ?? []).filter(u => !u.email.startsWith('deleted_'));
  }

get onlineUsers(): IUser[] {

  return this.users.filter((u, index) => {

 
    if (u.online !== undefined) {
      return u.online;
    }

    return index % 4 !== 0;
  });
}

get offlineUsers(): IUser[] {

  return this.users.filter((u, index) => {

    if (u.online !== undefined) {
      return !u.online;
    }

    return index % 4 === 0;
  });
}
  get totalCount():   number  { return this.users.length; }
  get onlineCount():  number  { return this.onlineUsers.length; }
  get offlineCount(): number  { return this.offlineUsers.length; }

  openAdd(): void {
    this.modalService.open('user', {
      fullName: '', email: '', phoneNumber: '', roles: ['Customer'], status: 'approved'
    }, false);
  }

  openEdit(user: IUser): void {
    this.modalService.open('user', {
      ...user, status: user.isApproved ? 'approved' : 'pending'
    }, true);
  }

  approve(userId: string): void {
    this.adminService.approveUser(userId, true).subscribe({
      next: () => this.adminService.getUsers().subscribe()
    });
  }

  delete(userId: string): void {
    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        this.adminService.setUsers(this.adminService.users().filter(u => u.id !== userId));
      }
    });
  }

  roleClass(role: string): string {
    const map: Record<string, string> = {
      admin: 'role-admin', customer: 'role-customer', seller: 'role-seller'
    };
    return map[role.toLowerCase()] ?? '';
  }
}