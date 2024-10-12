import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any = {};
  invoices: any[] = [];
  isAdmin: boolean = false;
  dataSource = new MatTableDataSource<any>([]); 
  displayedColumns: string[] = ['id', 'amount', 'date', 'actions'];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    // Proverite da li userData postoji i da nije undefined ili null
    if (userData && userData !== 'undefined') {
      try {
        this.user = JSON.parse(userData);  // Pokušaj parsiranja
        console.log('User data:', this.user);  // Logiranje korisničkih podataka

        // Proveri da li je role definisana
        if (this.user.role) {
          this.isAdmin = this.user.role === 'admin';  // Proverite da li je korisnik admin
        } else {
          console.error('Role is not defined for the user.');
        }

        this.getInvoices();  // Pozivanje funkcije za dohvatanje faktura
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.router.navigate(['/login']);  // Preusmjeravanje na login stranicu u slučaju greške
      }
    } else {
      console.error('User data is not available or invalid. Redirecting to login...');
      this.router.navigate(['/login']);  // Preusmjeravanje na login stranicu ako podaci ne postoje
    }
  }

  getInvoices(): void {
    const apiUrl = this.isAdmin ? 'http://localhost:8000/admin/invoices' : 'http://localhost:8000/invoices';
    const token = localStorage.getItem('access_token');

    const headers = { Authorization: `Bearer ${token}` };

    console.log("Fetching invoices from:", apiUrl); // Loguj koji API se poziva
    
    this.http.get<any[]>(apiUrl, { headers }).subscribe({
      next: (data) => {
        console.log('Invoices fetched:', data);
        this.invoices = data;
        this.dataSource.data = this.invoices;
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
        alert('Failed to fetch invoices. Please try again later.'); // Obavestiti korisnika
      }
    });
  }

  deleteInvoice(id: number): void {
    const apiUrl = `http://localhost:8000/invoices/${id}`;
    const token = localStorage.getItem('access_token');

    const headers = { Authorization: `Bearer ${token}` };

    this.http.delete(apiUrl, { headers }).subscribe({
      next: () => {
        console.log(`Invoice with id ${id} deleted.`);
        this.invoices = this.invoices.filter(invoice => invoice.id !== id);
        this.dataSource.data = this.invoices; 
      },
      error: (error) => {
        console.error('Error deleting invoice:', error);
        alert('Failed to delete invoice. Please try again later.'); // Obavestiti korisnika
      }
    });
  }
}
