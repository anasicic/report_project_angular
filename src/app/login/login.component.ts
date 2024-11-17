import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, RouterModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Response from login:', response); 

          // Osigurajte da je access_token prisutan u odgovoru
          if (response.access_token) {
            localStorage.setItem('access_token', response.access_token); // Sačuvajte token
            
            // Dekodirajte token kako biste dobili korisničke podatke
            const decodedToken = this.authService.decodeToken(response.access_token);  // Koristi dekodiranje
            const user = {
              username: decodedToken.sub || 'unknown', // Fallback u slučaju null
              role: decodedToken.role || 'unknown'
            };
            localStorage.setItem('user', JSON.stringify(user)); // Pohranite korisničke podatke
            console.log("User data saved:", user); // Logirajte sačuvane podatke
            this.router.navigate(['/home']);  
          } else {
            this.errorMessage = 'Failed to retrieve user data.';
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
          alert(this.errorMessage); // Prikažite grešku korisniku
        }
      });
    }
  }
}
