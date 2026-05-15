import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../../core/models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.loginForm.invalid) return;

    const data = this.loginForm.value as Login;

    this.authService.login(data).subscribe({
      next: (res) => {
        this.authService.setUser(res); 
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}