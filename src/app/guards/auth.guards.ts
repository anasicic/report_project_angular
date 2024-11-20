import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // CanActivate method to check if the user has access to the route
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if the token is stored in localStorage
    const token = localStorage.getItem('access_token');
    
    // If the token exists, the user has access to the route
    if (token) {
      return true;
    } else {
      // If no token, redirect to the login page
      this.router.navigate(['/login']);
      return false;  // Deny access to the route
    }
  }
}
