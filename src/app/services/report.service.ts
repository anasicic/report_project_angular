import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportUrl = 'http://localhost:8000/admin/report';  

  constructor(private http: HttpClient) {}

  // Dohvati izvještaj s backend-a
  getReport(): Observable<any> {
    const token = localStorage.getItem('access_token');  // Uzmi token iz localStorage
    if (!token) {
      console.error('No access token found');
      return throwError('No access token available');  // Ako nema tokena, vrati grešku
    }

    // Postavljanje zaglavlja s JWT tokenom za autorizaciju
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Dodaj token u zaglavlje
    });

    return this.http.get<any>(this.reportUrl, { headers }).pipe(
      map((response) => {
        // Ako je odgovor uspješan, možemo vratiti podatke
        return response.report;
      }),
      catchError((error) => {
        console.error('Error fetching report:', error);
        
        if (error.status === 401) {
          
          console.error('Authentication failed');
        } else if (error.status === 403) {
          console.error('You do not have permission to view this report');
        }

        return throwError('Failed to fetch the report data. Please try again later.');
      })
    );
  }
}
