import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model'; 

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  private apiUrl = 'http://localhost:8000/admin/suppliers'
; 

  constructor(private http: HttpClient) {}

  // Metoda za dohvat svih dobavljača
  getSuppliers(): Observable<Supplier[]> {
    const token = localStorage.getItem('access_token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  
    });

    return this.http.get<Supplier[]>(this.apiUrl, { headers });  // Prosljeđuje zaglavlja u zahtjev
  }
}
