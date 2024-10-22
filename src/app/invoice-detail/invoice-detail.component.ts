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
        // Ovde možete dodati dodatne pozive za dobavljača ako nije uključen u API poziv
      },
      error: (error) => {
        console.error('Error fetching invoice:', error);
      }
    });
  }
}
