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
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      try {
        this.user = JSON.parse(userData);
        console.log('User data:', this.user); // Log user data
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.router.navigate(['/login']);
        return;
      }

      this.isAdmin = this.user.role === 'admin';
      this.getInvoices();
    } else {
      console.error('User data is not available. Redirecting to login...');
      this.router.navigate(['/login']);
    }
  }

  getInvoices(): void {
    let apiUrl = 'http://localhost:8000/invoices';
    if (this.isAdmin) {
      apiUrl = 'http://localhost:8000/admin/invoices';
    }

    this.http.get<any[]>(apiUrl).subscribe({
      next: (data) => {
        console.log('Invoices fetched:', data);
        this.invoices = data;
        this.dataSource.data = this.invoices; // Postavi podatke u dataSource
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      }
    });
  }

  viewInvoice(id: number): void {
    this.router.navigate([`/invoice/${id}`]);
  }

  deleteInvoice(id: number): void {
    const apiUrl = `http://localhost:8000/invoices/${id}`;
    this.http.delete(apiUrl).subscribe({
      next: () => {
        this.invoices = this.invoices.filter(invoice => invoice.id !== id);
        this.dataSource.data = this.invoices; 
      },
      error: (error) => {
        console.error('Error deleting invoice:', error);
      }
    });
  }
}
