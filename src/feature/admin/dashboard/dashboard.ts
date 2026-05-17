import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../core/services/admin';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  adminService = inject(AdminService);

  ngOnInit(): void {
    this.adminService.getStats().subscribe();
    this.adminService.getPendingSellers().subscribe();
    this.adminService.getUsers().subscribe();
    this.adminService.getProducts().subscribe();
  }
}