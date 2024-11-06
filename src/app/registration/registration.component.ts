import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string | null = null; // Prikaz greške
  successMessage: string | null = null; // Prikaz uspješne poruke

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    // Definiraj formu s potrebnim poljima i validatorima
    this.registrationForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validator za provjeru da li se lozinke podudaraju
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  // Metoda koja se poziva na slanje forme
  onSubmit() {
    if (this.registrationForm.valid) {
      // Pozivanje metode iz RegistrationService servisa
      this.registrationService.registerUser(this.registrationForm.value).subscribe({
        next: (response: any) => {
          console.log('User registered:', response);

          // Provjera je li vraćen access token iz odgovora
          if (response.access_token) {
            // Spremanje tokena u localStorage
            localStorage.setItem('access_token', response.access_token);

            // Spremanje korisničkih podataka u localStorage
            const user = {
              id: response.id,
              username: response.username,
              role: response.role,
              email: response.email,
              first_name: response.first_name,
              last_name: response.last_name,
            };
            localStorage.setItem('user', JSON.stringify(user));

            // Prikaz uspješne poruke i redirekcija na početnu stranicu
            this.successMessage = 'Registration successful! Redirecting...';
            setTimeout(() => {
              this.router.navigate(['/home']); // Redirekcija na početnu stranicu
            }, 2000); // Čekaj 2 sekunde prije redirekcije
          } else {
            console.error('No token returned');
            this.errorMessage = 'Registration failed. No token returned. Please try again.';
          }
        },
        error: (error: any) => {
          console.error('Registration error:', error);
          this.errorMessage =
            'Registration error: ' + (error.error?.detail || 'An unknown error occurred.');
        },
      });
    } else {
      // Ako forma nije validna, prikaz greške
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}