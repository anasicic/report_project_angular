import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';
  private invoicesUrl = 'http://localhost:8000/invoices';

  constructor(private http: HttpClient) {}

  // Metoda za prijavu korisnika
  login(credentials: { username: string; password: string }): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);
  
    return this.http.post<any>(`${this.apiUrl}/token`, body.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  }


  getInvoices(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.invoicesUrl, { headers });
  }
}
