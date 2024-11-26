import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { SupplierBase } from '../models/supplier.model';
import { CostCenterBase } from '../models/cost_center.model';
import { TypeOfCostBase } from '../models/type_of_cost.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {
  private apiUrl = 'http://localhost:8000/admin/'; // Base API URL

  constructor(private http: HttpClient) {}

  // ======= User Methods =======
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}//users/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users/`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}create-user/`, user).pipe(
      catchError(error => this.handleError(error))
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}users/${user.id}`, user).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}users/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // ======= Supplier Methods =======
  getSupplierById(id: number): Observable<SupplierBase> {
    return this.http.get<SupplierBase>(`${this.apiUrl}supplier/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getSuppliers(): Observable<SupplierBase[]> {
    return this.http.get<SupplierBase[]>(`${this.apiUrl}supplier/`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createSupplier(supplierData: SupplierBase): Observable<SupplierBase> {
    return this.http.post<SupplierBase>(`${this.apiUrl}supplier/`, supplierData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  updateSupplier(supplier: SupplierBase): Observable<SupplierBase> {
    return this.http.put<SupplierBase>(`${this.apiUrl}supplier/${supplier.id}`, supplier).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}supplier/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // ======= Cost Center Methods =======
  getCostCenterById(id: number): Observable<CostCenterBase> {
    return this.http.get<CostCenterBase>(`${this.apiUrl}cost_center/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getCostCenters(): Observable<CostCenterBase[]> {
    return this.http.get<CostCenterBase[]>(`${this.apiUrl}cost_centers/`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createCostCenter(costCenterData: CostCenterBase): Observable<CostCenterBase> {
    return this.http.post<CostCenterBase>(`${this.apiUrl}cost_center/`, costCenterData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  updateCostCenter(costCenter: CostCenterBase): Observable<CostCenterBase> {
    return this.http.put<CostCenterBase>(`${this.apiUrl}cost_center/${costCenter.id}`, costCenter).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteCostCenter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}cost_centers/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // ======= Type of Cost Methods =======
  getTypeOfCostById(id: number): Observable<TypeOfCostBase> {
    return this.http.get<TypeOfCostBase>(`${this.apiUrl}type_of_cost/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  getTypesOfCost(): Observable<TypeOfCostBase[]> {
    return this.http.get<TypeOfCostBase[]>(`${this.apiUrl}type_of_cost/`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  createTypeOfCost(typeOfCostData: TypeOfCostBase): Observable<TypeOfCostBase> {
    return this.http.post<TypeOfCostBase>(`${this.apiUrl}type_of_cost/`, typeOfCostData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  updateTypeOfCost(typeOfCost: TypeOfCostBase): Observable<TypeOfCostBase> {
    return this.http.put<TypeOfCostBase>(`${this.apiUrl}type_of_cost/${typeOfCost.id}`, typeOfCost).pipe(
      catchError(error => this.handleError(error))
    );
  }

  deleteTypeOfCost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}types_of_cost/${id}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // Error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
