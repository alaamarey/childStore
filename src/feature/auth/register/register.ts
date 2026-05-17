import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Register } from '../../../core/models/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    role: new FormControl('Customer', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    if (this.registerForm.invalid) return;

    const data = this.registerForm.value as Register;

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('REGISTER SUCCESS:', res); // 🔥 text response
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('REGISTER ERROR:', err.error);
      }
    });
  }
}