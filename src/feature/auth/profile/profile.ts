import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html'
})
export class ProfileComponent {

  profileForm = new FormGroup({
    fullName: new FormControl(''),
    address: new FormControl(''),
    phoneNumber: new FormControl(''),
    paymentDetails: new FormControl('')
  });

  constructor(private authService: AuthService) {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.getProfile().subscribe((res: any) => {
      this.profileForm.patchValue(res);
    });
  }

  save() {
    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        alert('Profile updated successfully');
      }
    });
  }
}