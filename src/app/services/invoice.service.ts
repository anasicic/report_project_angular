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
  private currentUserUrl = 'http://localhost:8000/user/current_user'

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


  // **Dohvati trenutnog korisnika**
  get_current_user(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}current_user`, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  // Dohvati račun po ID-u
  getInvoiceById(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}${invoiceId}`, { headers: this.createHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

    // Dodajte metodu za ažuriranje računa
  updateInvoice(invoice: Invoice): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${invoice.id}`, invoice, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Dodajte metodu za brisanje računa
  deleteInvoice(invoiceId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${invoiceId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }


  // **Stvaranje nove fakture (invoice)**
  createInvoice(invoice: Invoice): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}create-invoice`, invoice, { headers: this.createHeaders() })  // Dodani headers
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

  // **Dohvati trenutnog korisnika**
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.currentUserUrl, { headers: this.createHeaders() })
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

