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
  private apiUrl = 'http://localhost:8000/admin/'; 

  private userUrl = `${this.apiUrl}`; 
  private supplierUrl = `${this.apiUrl}`;
  private costCenterUrl = `${this.apiUrl}`; 
  private typeOfCostUrl = `${this.apiUrl}`; 

  constructor(private http: HttpClient) {}


  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userUrl}${id}`);
  }

  
  getSupplierById(id: number): Observable<SupplierBase> {
    return this.http.get<SupplierBase>(`${this.supplierUrl}${id}`);
  }

  
  getCostCenterById(id: number): Observable<CostCenterBase> {
    return this.http.get<CostCenterBase>(`${this.costCenterUrl}${id}`);
  }

  
  getTypeOfCostById(id: number): Observable<TypeOfCostBase> {
    return this.http.get<TypeOfCostBase>(`${this.typeOfCostUrl}${id}`);
  }

 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  
  getCostCenters(): Observable<CostCenterBase[]> {
    return this.http.get<CostCenterBase[]>(this.costCenterUrl);
  }

  
  getSuppliers(): Observable<SupplierBase[]> {
    return this.http.get<SupplierBase[]>(this.supplierUrl);
  }

  
  getTypesOfCost(): Observable<TypeOfCostBase[]> {
    return this.http.get<TypeOfCostBase[]>(this.typeOfCostUrl);
  }

  
  createSupplier(supplierData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}supplier/`, supplierData);
  }
  

  
  createCostCenter(costCenterData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}cost_center/`, costCenterData);
  }

  
  createTypeOfCost(typeOfCostData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}type_of_cost/`, typeOfCostData);
  }

  
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.userUrl}${user.id}`, user);
  }

  
  updateSupplier(supplier: SupplierBase): Observable<any> {
    return this.http.put(`${this.supplierUrl}${supplier.id}`, supplier);
  }

  
  updateCostCenter(costCenter: CostCenterBase): Observable<any> {
    return this.http.put(`${this.costCenterUrl}${costCenter.id}`, costCenter);
  }

  
  updateTypeOfCost(typeOfCost: TypeOfCostBase): Observable<any> {
    return this.http.put(`${this.typeOfCostUrl}${typeOfCost.id}`, typeOfCost);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}create-user`, user).pipe(
        catchError(error => {
            console.error('Error creating user', error);
            return throwError(error);
        })
    );
}
}