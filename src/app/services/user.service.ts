import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/user/current_user'; 

  constructor(private http: HttpClient) {}

  // Učitaj korisničke podatke
  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Ažuriraj korisničke podatke
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, userData);
  }
}
