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
      // Koristimo AuthService za prijavu
      this.authService.login(this.loginForm.value)
        .subscribe({
          next: (response) => {
            // Ako je prijava uspešna, sačuvaj token
            localStorage.setItem('access_token', response.access_token); // Sačuvaj token u local storage
            this.router.navigate(['/']); // Preusmeri korisnika na početnu stranicu

            // Poziv za dobijanje faktura nakon prijave
            this.authService.getInvoices().subscribe({
              next: (invoices) => {
                console.log('Invoices:', invoices); // Prikaz ili obrada faktura
              },
              error: (err) => {
                console.error('Error fetching invoices:', err);
              }
            });
          },
          error: (error) => {
            this.errorMessage = error.error.detail || 'Login failed.'; // Ažuriraj poruku o grešci
          }
        });
    } else {
      this.errorMessage = 'Please fill in all required fields.'; // Poruka o grešci za nevalidnu formu
    }
  }
}
