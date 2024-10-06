import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common';

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
    private http: HttpClient,
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
      this.http.post('http://localhost:8000/login', this.loginForm.value)
        .subscribe({
          next: (response) => {
            // Ako je prijava uspješna, preusmjerite korisnika
            this.router.navigate(['/dashboard']); // ili bilo koja druga ruta
          },
          error: (error) => {
            this.errorMessage = error.error.detail || 'Prijava nije uspjela.';
          }
        });
    } else {
      this.errorMessage = 'Molimo vas da ispunite sva obavezna polja.';
    }
  }
}
