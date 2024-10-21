import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8000/invoices/'; 
  private suppliersUrl = 'http://localhost:8000/user/suppliers'; 
  private typeOfCostsUrl = 'http://localhost:8000/user/type-of-costs'; 
  private costCentersUrl = 'http://localhost:8000/user/cost-centers'; 

  constructor(private http: HttpClient) { }

  // Helper function to create headers
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); 
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}create-invoice`, invoice, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
}

  // Dohvati dobavljače
  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(this.suppliersUrl, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Dohvati tipove troškova
  getTypeOfCosts(): Observable<any[]> {
    return this.http.get<any[]>(this.typeOfCostsUrl, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Dohvati centre troškova
  getCostCenters(): Observable<any[]> {
    return this.http.get<any[]>(this.costCentersUrl, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
