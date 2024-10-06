import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any = {};  // Ovo će sadržavati podatke o korisniku
  invoices: any[] = []; // Lista računa
  isAdmin: boolean = false; // Flag za admina
  displayedColumns: string[] = ['id', 'amount', 'date', 'actions'];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Ovdje možeš dobaviti podatke o korisniku, npr. iz localStorage ili putem API-a
    this.user = JSON.parse(localStorage.getItem('user')!);
    
    // Provjeri je li korisnik admin
    this.isAdmin = this.user.role === 'admin';
    
    // Dobavi račune s backend-a
    this.getInvoices();
  }

  // Dobavljanje računa, različito za admina i korisnika
  getInvoices(): void {
    let apiUrl = 'http://localhost:8000/invoices';
    if (this.isAdmin) {
      // Ako je admin, dobavi sve račune
      apiUrl = 'http://localhost:8000/admin/invoices';
    }

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      }
    });
  }

  // Pogledaj detalje računa
  viewInvoice(id: number): void {
    this.router.navigate([`/invoice/${id}`]); // Navigacija na detalje o računu
  }

  // Brisanje računa
  deleteInvoice(id: number): void {
    const apiUrl = `http://localhost:8000/invoices/${id}`;
    this.http.delete(apiUrl).subscribe({
      next: () => {
        this.invoices = this.invoices.filter(invoice => invoice.id !== id);
      },
      error: (error) => {
        console.error('Error deleting invoice:', error);
      }
    });
  }
}
