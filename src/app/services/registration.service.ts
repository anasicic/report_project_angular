import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';  // Za preusmjeravanje
import { AuthService } from './auth.service';  // AuthService za prijavu nakon registracije

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8000/auth';  // Provjerite da li je ovo ispravna URL adresa

  constructor(
    private http: HttpClient,
    private authService: AuthService,  // Uvezite AuthService za prijavu korisnika
    private router: Router  // Uvezite Router za preusmjeravanje
  ) {}

  // Metoda za registraciju korisnika
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-user`, userData).pipe(
      // Kada je korisnik uspješno registriran, automatski pozovite login
      switchMap((response) => {
        // Pretpostavimo da login endpoint prihvaća iste vjerodajnice kao i registracija
        return this.authService.login({
          username: userData.username,
          password: userData.password,
        });
      }),
      tap((response) => {
        // Ako je prijava uspješna i token je pohranjen, preusmjerite korisnika
        this.router.navigate(['/home']);
      }),
      catchError((error) => {
        console.error('Registration or login error', error);
        return throwError(error);
      })
    );
  }
}
