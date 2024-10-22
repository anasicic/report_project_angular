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
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private router: Router,
    private snackBar: MatSnackBar 
  ) {
    this.invoiceForm = this.fb.group({
      invoice_number: ['', Validators.required],
      date: ['', Validators.required],
      supplier_id: ['', Validators.required],
      cost_code_id: ['', Validators.required],
      cost_center_id: ['', Validators.required],
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodaj 1 jer su mjeseci 0-indeksirani
    const day = String(date.getDate()).padStart(2, '0'); // Dodaj nule ispred dana/mjeseca ako su jednobrojčani
    return `${year}-${month}-${day}`; // Vraća datum u formatu YYYY-MM-DD
  }


  onSubmit() {
    if (this.invoiceForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    // Prvo dohvatimo trenutnog korisnika
    this.invoiceService.getCurrentUser().subscribe({
      next: (user) => {
        const invoice: Invoice = {
          id: 0,  
          invoice_number: this.invoiceForm.get('invoice_number')?.value,
          date: this.formatDate(this.invoiceForm.get('date')?.value),  // Formatiranje datuma
          netto_amount: this.invoiceForm.get('netto_amount')?.value,
          cost_code_id: this.invoiceForm.get('cost_code_id')?.value,
          cost_center_id: this.invoiceForm.get('cost_center_id')?.value,
          supplier_id: this.invoiceForm.get('supplier_id')?.value,
          user_id: user.id,  
          supplier: this.invoiceForm.get('supplier')?.value 
        };
  
        this.invoiceService.createInvoice(invoice).subscribe({
          next: (response) => {
            console.log('Invoice created successfully:', response);
            // Preusmjeravanje na početnu stranicu
          this.router.navigate(['/home']);

          // Prikaz Snackbar poruke
          this.snackBar.open('Invoice created successfully!', 'Close', {
            duration: 3000, // 3 seconds
          });
          },
          error: (error) => {
            console.error('Error creating invoice:', error);
            // Prikaz Snackbar poruke o neuspjehu
          this.snackBar.open('Failed to create invoice. Please try again.', 'Close', {
            duration: 3000, // 3 seconds
          });
          }
        });
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
      }
    });
  }

}