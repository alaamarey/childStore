import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
//Layout component for admin pages, includes navigation and logout functionality
export class AdminLayoutComponent {

  fullName = localStorage.getItem('fullName') || 'Admin';

  logout() {
    localStorage.clear();
    location.href = '/login';
  }
}