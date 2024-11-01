import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-edit',
  standalone: true,
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class InvoiceEditComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceId!: number; 

  suppliers: any[] = []; 
  typeOfCosts: any[] = []; 
  costCenters: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForm();
    this.loadInvoiceData();
    this.loadSuppliers();
    this.loadTypeOfCosts();
    this.loadCostCenters();
  }

  initializeForm(): void {
    this.invoiceForm = this.fb.group({
      invoice_number: ['', Validators.required],
      date: ['', Validators.required],
      supplier_id: ['', Validators.required],
      cost_code_id: ['', Validators.required],
      cost_center_id: ['', Validators.required],
      netto_amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  loadInvoiceData(): void {
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe((invoice: Invoice) => {
      this.invoiceForm.patchValue(invoice); 
    });
  }

  loadSuppliers(): void {
    this.invoiceService.getSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers; 
    });
  }

  loadTypeOfCosts(): void {
    this.invoiceService.getTypeOfCosts().subscribe((types) => {
      this.typeOfCosts = types;
      console.log('Loaded type of costs:', this.typeOfCosts); 
    });
  }
  
  loadCostCenters(): void {
    this.invoiceService.getCostCenters().subscribe((centers) => {
      console.log('Received cost centers:', centers);
      this.costCenters = centers;
      console.log('Loaded cost centers:', this.costCenters); 
    });
  }

  onUpdate(): void {
    if (this.invoiceForm.valid) {
      const updatedInvoice: Invoice = this.invoiceForm.value; 
      updatedInvoice.id = this.invoiceId; 
      this.invoiceService.updateInvoice(updatedInvoice).subscribe(() => {
        this.router.navigate(['/invoices']); 
      });
    }
  }
}
