import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

interface ReportData {
  [typeOfCost: string]: {
    [costCenter: string]: number;
  };
}

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  imports: [CommonModule] 
})
export class ReportComponent implements OnInit {
  reportData: ReportData = {};  // Pohrana podatka o izvještaju
  errorMessage: string | null = null;  // Poruka za greške
  private reportUrl = 'http://localhost:8000/admin/report';  

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchReport();  // Dohvati izvještaj kad komponenta bude inicijalizirana
  }

  // Funkcija za dohvat izvještaja s backend-a
  fetchReport(): void {
    const token = this.authService.getToken();  // Preuzmi JWT token
    if (!token) {
      this.errorMessage = 'User is not logged in';  // Ako token nije prisutan, obavijesti korisnika
      return;
    }

    // Postavljanje zaglavlja s JWT tokenom za autorizaciju
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.getReport(headers).subscribe({
      next: (data) => {
        console.log('Fetched report data:', data);  // Logirajte podatke da biste vidjeli strukturu
        this.reportData = data.report;  // Pohrani dohvaćene podatke
      },
      error: (error) => {
        this.errorMessage = 'Failed to load report data.';  // Ako dođe do greške
        console.error('Error:', error);
      }
    });
  }

  // Metoda koja šalje GET zahtjev za dohvat izvještaja
  private getReport(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(this.reportUrl, { headers });
  }


  getTypesOfCost(): string[] {
    // Vraća listu tipova troškova (ključeva u reportData)
    return Object.keys(this.reportData);  // Ispravno korištenje globalnog Object
  }

  getCostCenters(typeOfCost: string): string[] {
    if (this.reportData[typeOfCost]) {
      // Vraća listu centara troškova za određeni tip troška
      return Object.keys(this.reportData[typeOfCost]);  // Ispravno korištenje globalnog Object
    }
    return [];
  }
}
