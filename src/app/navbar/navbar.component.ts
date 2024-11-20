import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  showLinks: boolean = true; // Controls whether to show the navigation links
  role: string | null = null; // Current role of the user
  currentRoute: string = ''; // Current route/path
  isLoggedIn: boolean = false; // Status indicating whether the user is logged in

  private loggedInSub: Subscription = new Subscription(); // Subscription to track login status changes

  constructor(private router: Router, private authService: AuthService) {
    // Listens to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Updates current route when navigation ends
        // Show or hide navigation links based on the route
        this.showLinks = !(this.isLoginPage() || this.isRegistrationPage());  // Hide links on login/registration pages
      }
    });
  }

  ngOnInit(): void {
    // Subscribe to login status changes via loggedInStatus$
    this.loggedInSub = this.authService.loggedInStatus$.subscribe((status) => {
      this.isLoggedIn = status;  // Set isLoggedIn based on the user's login status
      if (this.isLoggedIn) {
        // Fetch user role when logged in, if not already fetched
        if (!this.role) {  // If role is not already set, fetch it
          this.authService.getUserRole().subscribe({
            next: (role) => {
              this.role = role;  // Set the user role
            },
            error: (err) => console.error('Error fetching user role:', err),  // Handle any error in fetching user role
          });
        }
      } else {
        this.role = null; // Reset role when the user is logged out
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the login status observable when the component is destroyed to avoid memory leaks
    this.loggedInSub.unsubscribe();
  }

  // Checks if the current route is the login page
  isLoginPage(): boolean {
    return this.currentRoute === '/login';
  }

  // Checks if the current route is the registration page
  isRegistrationPage(): boolean {
    return this.currentRoute === '/registration';
  }

  // Logs the user out and redirects to the login page
  logout(): void {
    this.authService.logout(); // Log out the user by clearing the session
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
