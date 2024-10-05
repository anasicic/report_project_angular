import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ensure both CommonModule and ReactiveFormsModule are imported
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup; // Registration form
  loading: boolean = false; // Loading indicator
  errorMessage: string | null = null; // Error message

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the form
    this.registrationForm = this.fb.group({
      username: ['', Validators.required], // Username
      email: ['', [Validators.required, Validators.email]], // Email
      first_name: ['', Validators.required], // First name
      last_name: ['', Validators.required], // Last name
      password: ['', [Validators.required, Validators.minLength(6)]], // Password
      confirmPassword: ['', Validators.required], // Confirm password
      role: [''] // Role (optional)
    });
  }

  // Method for submitting the form
  onSubmit() {
    if (this.registrationForm.valid) {
      // Check if passwords match
      if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.loading = true; // Set loading to true

      this.http.post('http://localhost:8000/create-user', this.registrationForm.value)
        .subscribe({
          next: (response) => {
            // If registration is successful, redirect user
            this.router.navigate(['/login']);
          },
          error: (error) => {
            // Handle error
            this.loading = false; // Stop loading
            this.errorMessage = error.error.detail || 'An error occurred during registration.';
          },
          complete: () => {
            this.loading = false; // Stop loading
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
