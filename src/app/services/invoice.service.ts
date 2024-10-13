import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8000/invoices'; 

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    // Pretpostavljamo da je token spremljen u localStorage
    const token = localStorage.getItem('access_token'); // Pobrinite se da koristite ispravan naziv ključa

    // Postavi zaglavlje za autorizaciju
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Invoice[]>(this.apiUrl, { headers });
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    const token = localStorage.getItem('access_token'); // Pobrinite se da koristite ispravan naziv ključa
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Invoice>(`${this.apiUrl}/create-invoice`, invoice, { headers });
  }
}
