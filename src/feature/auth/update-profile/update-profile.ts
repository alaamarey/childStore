import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  templateUrl: './update-profile.html',
  styleUrl: './update-profile.css'
})
export class UpdateProfile {

  profileForm = new FormGroup({
    fullName: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    paymentDetails: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
   this.loadProfile();
}

  loadProfile() {
    this.authService.getProfile().subscribe((res: any) => {
      this.profileForm.patchValue(res);
    });
  }

  submit() {
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        alert('Profile Updated Successfully');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}