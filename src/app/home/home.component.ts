import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices = new MatTableDataSource<Invoice>();
  suppliers: Supplier[] = []; 
  displayedColumns: string[] = ['invoice_number', 'supplier', 'date', 'netto_amount'];

  constructor(
    private invoiceService: InvoiceService,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this.loadData(); // Učitavanje podataka prilikom inicijalizacije
  }

  loadData() {
    // Čekamo da se učitaju i računi i dobavljači koristeći forkJoin
    forkJoin({
      invoices: this.invoiceService.getInvoices().pipe(
        catchError(error => {
          console.error('Greška prilikom dohvata računa:', error);
          return [];
        })
      ),
      suppliers: this.supplierService.read_suppliers().pipe(
        catchError(error => {
          console.error('Greška prilikom dohvata dobavljača:', error);
          return [];
        })
      )
    }).subscribe(({ invoices, suppliers }) => {
      this.suppliers = suppliers; // Spremamo dobavljače
      console.log('Dobavljači:', this.suppliers); // Provjeravamo dobavljače

      // Povezujemo račune s odgovarajućim dobavljačima
      this.invoices.data = invoices.map((invoice) => {
        const supplierName = this.getSupplierName(invoice.supplier_id);
        console.log(`Račun ID: ${invoice.id}, Dobavljač ID: ${invoice.supplier_id}, Dobavljač: ${supplierName}`);
        return {
          ...invoice,
          date: new Date(invoice.date).toISOString(),
          supplier: supplierName,
        };
      });
      console.log("Računi nakon povezivanja:", this.invoices.data);
    });
  }

  getSupplierName(supplierId: number): string {
    console.log(`Tražim dobavljača s ID-om: ${supplierId}`);
    // Ispiši sve dobavljače da provjeriš njihove ID-eve
    console.log('Svi dobavljači:', this.suppliers);
    
    const supplier = this.suppliers.find(s => s.id === supplierId);
    console.log(`Pronađen dobavljač:`, supplier);
    return supplier ? supplier.supplier_name : 'Nepoznat dobavljač';
  }
}
