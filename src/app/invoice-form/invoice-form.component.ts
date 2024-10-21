import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Invoice } from '../models/invoice.model';


@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent {
  invoiceForm: FormGroup;
  suppliers: any[] = [];
  typeOfCosts: any[] = [];
  costCenters: any[] = [];

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      invoice_number: ['', Validators.required],
      date: ['', Validators.required],
      supplier_id: ['', Validators.required],
      cost_code_id: ['', Validators.required],
      cost_center_code_id: ['', Validators.required],
      netto_amount: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.fetchSuppliers();
    this.fetchTypeOfCosts();
    this.fetchCostCenters();
  }

  fetchSuppliers() {
    this.invoiceService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  fetchTypeOfCosts() {
    this.invoiceService.getTypeOfCosts().subscribe(data => {
      this.typeOfCosts = data;
    });
  }

  fetchCostCenters() {
    this.invoiceService.getCostCenters().subscribe(data => {
      this.costCenters = data;
    });
  }

  onSubmit() {
    if (this.invoiceForm.invalid) {
      console.error('Form is invalid');
      return; 
    }

    const invoice: Invoice = {
      id: 0,  
      invoice_number: this.invoiceForm.get('invoice_number')?.value,
      date: this.invoiceForm.get('date')?.value,
      netto_amount: this.invoiceForm.get('netto_amount')?.value,
      cost_code_id: this.invoiceForm.get('cost_code_id')?.value,
      cost_center_id: this.invoiceForm.get('cost_center_id')?.value,
      supplier_id: this.invoiceForm.get('supplier_id')?.value,
      user_id: 0, 
      supplier: this.invoiceForm.get('supplier')?.value 
    };

    this.invoiceService.createInvoice(invoice).subscribe({
      next: (response) => {
        console.log('Invoice created successfully:', response);
        
      },
      error: (error) => {
        console.error('Error creating invoice:', error);
      }
    });
  }
}