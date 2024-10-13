import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier.model';

import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invoices = new MatTableDataSource<Invoice>();
  suppliers: Supplier[] = []; 
  displayedColumns: string[] = ['invoice_number', 'supplier', 'date', 'netto_amount'];

  constructor(private invoiceService: InvoiceService, private supplierService: SupplierService) {}

  ngOnInit() {
    this.loadInvoices();
    this.loadSuppliers();
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices.data = data.map((invoice) => {
        const supplierName = this.getSupplierName(invoice.supplier_id);
        console.log(`Račun ID: ${invoice.id}, Supplier ID: ${invoice.supplier_id}, Supplier Name: ${supplierName}`);
        return {
          ...invoice,
          date: new Date(invoice.date).toISOString(),
          supplier: supplierName,
        };
      });
      console.log("Računi nakon povezivanja:", this.invoices.data);
    });
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe((data) => {
      this.suppliers = data;
      console.log("Dobavljači:", this.suppliers);
    });
  }

  getSupplierName(supplierId: number): string {
    const supplier = this.suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.supplier_name : 'Nepoznat dobavljač';
  }
}
