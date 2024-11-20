import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app.routes'; 


import { AppComponent } from './app.component';

import { MatTableModule } from '@angular/material/table'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from './services/auth.service';
import { InvoiceService } from './services/invoice.service'; 
import { RegistrationService } from './services/registration.service'; 
import { SupplierService } from './services/supplier.service';
import { UserService } from './services/user.service';

// Import standalone components
import { HomeComponent } from './home/home.component'; 
import { RegistrationComponent } from './registration/registration.component'; 
import { LoginComponent } from './login/login.component'; 
import { InvoiceFormComponent } from './invoice-form/invoice-form.component'; 
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReportComponent } from './report/report.component';



@NgModule({
  imports: [
    BrowserModule,
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
    MatSelectModule,
    MatSnackBarModule,
    
    
    // Standalone components
    HomeComponent, 
    RegistrationComponent, 
    LoginComponent,
    InvoiceFormComponent,
    InvoiceDetailComponent,
    InvoiceEditComponent,
    NavbarComponent,
    UserProfileComponent,
    ReportComponent,
  ],

  providers: [
    AuthService,
    InvoiceService,
    RegistrationService,
    SupplierService,
    UserService,
  ],

  bootstrap: [AppComponent] // Start the application with AppComponent
})
export class AppModule { }
