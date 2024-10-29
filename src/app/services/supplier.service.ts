import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Importing catchError for error handling
import { SupplierBase } from '../models/supplier.model'; 

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  // Correct API URL
  private apiUrl = 'http://localhost:8000/invoices/data/suppliers'; 

  constructor(private http: HttpClient) {}

  // Method to fetch suppliers
  read_suppliers(): Observable<SupplierBase[]> {
    const token = localStorage.getItem('access_token'); 
  
    if (!token) {
      console.error('Token not found.');
      return of([]); // Return an empty array if no token is found
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Making the GET request to fetch suppliers
    return this.http.get<SupplierBase[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching suppliers:', error);
        return of([]); // Return an empty array on error
      })
    );
  }
}
