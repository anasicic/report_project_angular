import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';  // Dodano za dekodiranje JWT

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';
  private invoicesUrl = 'http://localhost:8000/invoices';
  private jwtHelper = new JwtHelperService();  // Dodano za instanciranje JWT helpera

  constructor(private http: HttpClient) {}

  // Metoda za prijavu korisnika
  login(credentials: { username: string; password: string }): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    return this.http.post<{
      access_token: string;
      token_type: string;
    }>(
      `${this.apiUrl}/token`, 
      body.toString(), 
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).pipe(
      tap((response) => {
        console.log("Raw response from backend:", response);
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
        }
      }),
      catchError((error) => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Metoda za dekodiranje JWT tokena
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  // Metoda za preuzimanje računa
  getInvoices(): Observable<any> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No access token found. Redirecting to login.');
      return throwError('No access token available');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any>(this.invoicesUrl, { headers }).pipe(
      tap((invoices) => {
        console.log('Invoices fetched successfully', invoices);
      }),
      catchError((error) => {
        console.error('Error fetching invoices', error);
        return throwError(error);
      })
    );
  }
}

 
