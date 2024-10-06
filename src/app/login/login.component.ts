import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button'; 
import { AuthService } from '../services/auth.service';  // Uvezi AuthService

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Koristimo AuthService
    private router: Router
  ) {
    // Inicijalizirajte formu
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Using AuthService for login
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            // If login is successful, store the token
            localStorage.setItem('access_token', response.access_token); // Store token in local storage
            this.router.navigate(['/dashboard']); // Navigate to the dashboard or any other route
          },
          error: (error) => {
            this.errorMessage = error.error.detail || 'Login failed.'; // Update error message
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields.'; // Error message for invalid form
    }
  }
}  