import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../services/supplier.service';
import { SupplierBase } from '../models/supplier.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices = new MatTableDataSource<Invoice>();
  suppliers: SupplierBase[] = [];
  displayedColumns: string[] = ['invoice_number', 'supplier', 'date', 'netto_amount', 'actions'];

  constructor(
    private invoiceService: InvoiceService,
    private supplierService: SupplierService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      invoices: this.invoiceService.getInvoices().pipe(
        catchError(error => {
          console.error('Error fetching invoices:', error);
          return of([]); 
        })
      ),
      suppliers: this.supplierService.read_suppliers().pipe( // Updated to read_suppliers
        catchError(error => {
          console.error('Error fetching suppliers:', error);
          return of([]);
        })
      )
    }).subscribe(({ invoices, suppliers }) => {
      this.suppliers = suppliers;
      console.log('Suppliers successfully fetched:', this.suppliers);

      // Linking invoices with the corresponding suppliers
      this.invoices.data = invoices.map((invoice) => {
        const supplierName = this.getSupplierName(invoice.supplier_id);
        console.log(`Invoice ID: ${invoice.id}, Supplier ID: ${invoice.supplier_id}, Supplier: ${supplierName}`);
        return {
          ...invoice,
          date: this.formatDate(invoice.date),
          supplier: supplierName,
        };
      });
      console.log("Invoices after linking:", this.invoices.data);
    });
  }

  formatDate(date: string): string {
    const cleanedDate = date.replace(/\./g, '').trim();
    const [day, month, year] = cleanedDate.split(' ');

    const parsedDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(parsedDate.getTime())) {
      console.error(`Unknown date: ${cleanedDate}`);
      return 'Unknown date';
    }

    return parsedDate.toLocaleDateString();
  }

  getSupplierName(supplierId: number): string {
    console.log(`Searching for supplier with ID: ${supplierId}`);
    
    const supplier = this.suppliers.find(s => s.id === supplierId);
    if (!supplier) {
      console.warn(`Supplier with ID ${supplierId} not found!`);
    }
    return supplier ? supplier.supplier_name : 'Unknown supplier';
  }

  onAddInvoice() {
    this.router.navigate(['/add-invoice']);
  }

  editInvoice(invoiceId: number): void {
    this.router.navigate(['/invoice-edit', invoiceId]);
  }

  deleteInvoice(invoiceId: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(invoiceId).subscribe({
        next: () => {
          alert('Invoice successfully deleted!'); // Notification for successful deletion
          this.loadData();
        },
        error: (error) => {
          console.error('Error deleting invoice:', error);
          alert('An error occurred while deleting the invoice.'); // Notification for error
        }
      });
    }
  }
}
