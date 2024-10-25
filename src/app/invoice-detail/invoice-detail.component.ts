import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, MatSelectModule],
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  invoiceId!: number; 
  invoice: Invoice | undefined;
  supplierName: string | undefined;
  typeOfCostName: string | undefined;
  costCenterName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.invoiceId = +params.get('id')!;
      this.loadInvoice();
    });
  }

  loadInvoice(): void {
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
      next: (invoice) => {
        this.invoice = invoice;

        // Fetch supplier name if supplier_id exists
        if (invoice.supplier_id) {
          this.invoiceService.getSupplierById(invoice.supplier_id).subscribe({
            next: (supplier) => {
              this.supplierName = supplier.supplier_name;
              console.log('Supplier fetched:', supplier);
            },
            error: (error) => {
              console.error('Error fetching supplier:', error);
            }
          });
        }

        // Fetch type of cost name if type_of_cost_id exists
        if (invoice.cost_code_id) {
          this.invoiceService.getTypeOfCostById(invoice.cost_code_id).subscribe({
            next: (typeOfCost) => {
              this.typeOfCostName = typeOfCost.cost_name;
              console.log('Type of Cost fetched:', typeOfCost);
            },
            error: (error) => {
              console.error('Error fetching type of cost:', error);
            }
          });
        }

        // Fetch cost center name if cost_center_id exists
        if (invoice.cost_center_id) {
          this.invoiceService.getCostCenterById(invoice.cost_center_id).subscribe({
            next: (costCenter) => {
              this.costCenterName = costCenter.cost_center_name;
              console.log('Cost Center fetched:', costCenter);
            },
            error: (error) => {
              console.error('Error fetching cost center:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching invoice:', error);
      }
    });
  }
}
