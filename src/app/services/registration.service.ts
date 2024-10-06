import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Uvezi HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Ovaj servis će biti dostupan u cijeloj aplikaciji
})
export class RegistrationService {
  private apiUrl = 'https://your-api-url.com/register';  // Zamijeni s tvojim API endpointom

  constructor(private http: HttpClient) {}

  // Metoda za registraciju korisnika
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);  // Pošalji POST zahtjev na API
  }
}
