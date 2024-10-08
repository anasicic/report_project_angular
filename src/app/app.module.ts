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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent, 
    LoginComponent 
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    AppRoutingModule, 
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [
    InvoiceService,
    RegistrationService 
  ],
  bootstrap: [AppComponent] // Pokreni aplikaciju s AppComponent
})
export class AppModule { }
