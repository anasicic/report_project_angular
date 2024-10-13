import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app.routes'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component'; 
import { InvoiceService } from './services/invoice.service'; 
import { RegistrationService } from './services/registration.service'; 
import { LoginComponent } from './login/login.component';
import { MatTableModule } from '@angular/material/table'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from './services/auth.service';
import { SupplierService } from './services/supplier.service';

@NgModule({
  declarations: [
    HomeComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    AppRoutingModule, 
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [
    AuthService,
    InvoiceService,
    RegistrationService,
    SupplierService
  ],
  bootstrap: [AppComponent] // Pokreni aplikaciju s AppComponent
})
export class AppModule { }
