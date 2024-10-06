import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        return;
      }

      this.loading = true;

      this.http.post('http://localhost:8000/create-user', this.registrationForm.value)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.loading = false;
            this.errorMessage = error.error.detail || 'An error occurred during registration.';
          },
          complete: () => {
            this.loading = false;
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
