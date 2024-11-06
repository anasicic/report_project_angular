import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Invoice } from '../models/invoice.model';
import { SupplierBase } from '../models/supplier.model';
import { CostCenterBase } from '../models/cost_center.model';
import { TypeOfCostBase } from '../models/type_of_cost.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8000/invoices/';
  private allSuppliersUrl = 'http://localhost:8000/invoices/data/suppliers';
  private typeOfCostsUrl = 'http://localhost:8000/invoices/data/type-of-costs';
  private costCentersUrl = 'http://localhost:8000/invoices/data/cost-centers';
  private currentUserUrl = 'http://localhost:8000/user/current_user';
  private updateUserUrl = 'http://localhost:8000/user/update_profile'; 

  // Base URLs for individual resources
  private supplierUrl = `${this.apiUrl}supplier/`;
  private typeOfCostUrl = `${this.apiUrl}type_of_cost/`;
  private costCenterUrl = `${this.apiUrl}cost_center/`;

  constructor(private http: HttpClient) {}

  // Helper function to create headers
  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // User-related methods
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.currentUserUrl, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateUserProfile(updatedData: any): Observable<any> {
    return this.http.put<any>(this.updateUserUrl, updatedData, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Invoice-related methods
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }
  
  getInvoiceById(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}${invoiceId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  createInvoice(invoice: Invoice): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}create-invoice`, invoice, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateInvoice(invoice: Invoice): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${invoice.id}`, invoice, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteInvoice(invoiceId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${invoiceId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Data retrieval methods for suppliers, types of cost, and cost centers
  getSuppliers(): Observable<SupplierBase[]> {
    return this.http.get<SupplierBase[]>(this.allSuppliersUrl, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  getTypeOfCosts(): Observable<TypeOfCostBase[]> {
    return this.http.get<TypeOfCostBase[]>(this.typeOfCostsUrl, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCostCenters(): Observable<CostCenterBase[]> {
    return this.http.get<CostCenterBase[]>(this.costCentersUrl, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }


  getSupplierById(supplierId: number): Observable<SupplierBase> {
    return this.http.get<SupplierBase>(`${this.supplierUrl}${supplierId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  getTypeOfCostById(typeOfCostId: number): Observable<TypeOfCostBase> {
    return this.http.get<TypeOfCostBase>(`${this.typeOfCostUrl}${typeOfCostId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCostCenterById(costCenterId: number): Observable<CostCenterBase> {
    return this.http.get<CostCenterBase>(`${this.costCenterUrl}${costCenterId}`, { headers: this.createHeaders() })
      .pipe(catchError(this.handleError));
  }

  
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Something went wrong'));
  }
}
