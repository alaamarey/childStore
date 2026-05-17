// src/app/feature/admin/banners/banners.ts

import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AdminService
} from '../../../core/services/admin';

@Component({
  selector: 'app-banners',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './banners.html',

  styleUrl: './banners.css'
})
export class BannersComponent
implements OnInit {

  adminService =
    inject(AdminService);

  title = '';

  imageUrl = '';

  ngOnInit(): void {

    this.adminService
      .getBanners()
      .subscribe();

  }

  createBanner() {

    const body = {

      id: 0,

      title: this.title,

      imageUrl: this.imageUrl,

      link: '',

      isActive: true,

      displayOrder: 0

    };

    this.adminService
      .createBanner(body)
      .subscribe(() => {

        this.title = '';

        this.imageUrl = '';

        this.adminService
          .getBanners()
          .subscribe();

      });

  }

  deleteBanner(id: number) {

    this.adminService
      .deleteBanner(id)
      .subscribe(() => {

        this.adminService
          .getBanners()
          .subscribe();

      });

  }

}