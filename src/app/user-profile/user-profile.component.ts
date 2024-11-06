import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    // Initialize the profile form with validators
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load user data into the form
  loadUserProfile(): void {
    this.invoiceService.getCurrentUser().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
          // Don't fill password field initially for security
        });
      },
      error: (error) => {
        this.errorMessage = 'Error loading user data.';
        console.error('Error:', error);
      },
    });
  }

  // Submit form to update user data
  onUpdateProfile(): void {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      
      this.invoiceService.updateUserProfile(updatedData).subscribe({
        next: () => {
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => {
            this.successMessage = null;
          }, 2000);
        },
        error: (error) => {
          this.errorMessage = 'Failed to update profile. Please try again.';
          console.error('Update error:', error);
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
