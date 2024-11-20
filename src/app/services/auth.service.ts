import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';  // Assuming a User model exists
import { Invoice } from '../models/invoice.model';  // Assuming an Invoice model exists

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth'; // The authentication API endpoint
  private userInfoUrl = 'http://localhost:8000/user/current_user'; // The endpoint to fetch the current user
  private invoicesUrl = 'http://localhost:8000/invoices'; // Endpoint to fetch invoices
  private jwtHelper = new JwtHelperService(); // JWT helper to decode and verify tokens

  // BehaviorSubject to track user role and login status
  private roleSubject = new BehaviorSubject<string | null>(null);
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  // Getter to access loggedInSubject's observable for login status
  get loggedInStatus$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Login user by sending credentials to the server
  login(credentials: { username: string; password: string }): Observable<{ access_token: string }> {
    const body = new URLSearchParams();
    body.set('username', credentials.username);  // Set the username in the request body
    body.set('password', credentials.password);  // Set the password in the request body

    // Send login request to the API
    return this.http.post<{ access_token: string }>(
      `${this.apiUrl}/token`,  // Token endpoint
      body.toString(),  // Form data string
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    ).pipe(
      tap((response) => {
        if (response && response.access_token) {
          // If token is received, save it in localStorage
          localStorage.setItem('access_token', response.access_token);
          // Set the user as logged in
          this.loggedInSubject.next(true);
          // Fetch and set the user role
          this.fetchUserRole();
        }
      }),
      catchError(this.handleError('login'))  // Handle errors
    );
  }

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Decode JWT token to get user details
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  // Fetch the current user from the backend API
  getCurrentUser(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No access token found'));  // If no token, throw an error
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Set Authorization header with token
    return this.http.get<User>(this.userInfoUrl, { headers }).pipe(
      tap((user) => {
        console.log('Fetched current user:', user);  // Log the fetched user data
        // Update the user role
        this.roleSubject.next(user.role);
      }),
      catchError(this.handleError('getCurrentUser'))  // Handle errors
    );
  }

  // Fetch the user role from the backend and update the BehaviorSubject
  fetchUserRole(): void {
    this.getCurrentUser().subscribe(
      (user) => {
        this.roleSubject.next(user.role);  // Update the role subject with the fetched role
      },
      (error) => {
        console.error('Error fetching user role:', error);  // Log any error fetching user role
      }
    );
  }

  // Get the current user role as an observable
  getUserRole(): Observable<string | null> {
    return this.roleSubject.asObservable();  // Return the role observable
  }

  // Check if the user is logged in by verifying the presence and validity of the token
  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);  // Check if token is not expired
  }

  // Logout the user by removing the token and resetting the login state
  logout(): void {
    localStorage.removeItem('access_token');  // Remove token from localStorage
    this.loggedInSubject.next(false); // Set login status to false
    this.roleSubject.next(null); // Reset user role
    console.log('User logged out successfully');
  }

  // Fetch invoices from the backend
  getInvoices(): Observable<Invoice[]> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No access token found'));  // If no token, throw an error
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Set Authorization header with token
    return this.http.get<Invoice[]>(this.invoicesUrl, { headers }).pipe(
      tap((invoices) => console.log('Fetched invoices:', invoices)),  // Log the fetched invoices
      catchError(this.handleError('getInvoices'))  // Handle errors
    );
  }

  // Centralized error handling method
  private handleError(operation = 'operation') {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed: ${error.message}`);  // Log the error
      return throwError(() => new Error(error.message || 'Server error'));  // Return a generic error message
    };
  }
}
