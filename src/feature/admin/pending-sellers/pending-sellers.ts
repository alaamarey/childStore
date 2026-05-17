// src/app/feature/admin/pending-sellers/pending-sellers.ts

import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AdminService
} from '../../../core/services/admin';

@Component({
  selector: 'app-pending-sellers',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './pending-sellers.html',

  styleUrl:
    './pending-sellers.css'
})
export class PendingSellersComponent
implements OnInit {

  adminService =
    inject(AdminService);

  sellers: any[] = [];

  ngOnInit(): void {

    this.loadSellers();

  }

  loadSellers() {

    this.adminService
      .getPendingSellers()
      .subscribe((res) => {

        this.sellers = res;

      });

  }

  approve(id: string) {

    this.adminService
      .approveSeller(id)
      .subscribe(() => {

        this.loadSellers();

      });

  }

  reject(id: string) {

    this.adminService
      .rejectSeller(id)
      .subscribe(() => {

        this.loadSellers();

      });

  }

}