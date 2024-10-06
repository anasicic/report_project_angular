import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://your-api-url/api/invoices';  // Promijeni na pravi URL

  constructor(private http: HttpClient) { }

  // Dohvati sve račune s API-ja
  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
