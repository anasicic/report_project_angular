import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Ovo mora biti ispravno uvezeno
import { HttpClientModule, provideHttpClient } from '@angular/common/http';  // Ovdje dodaj http module

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';  // Uvezi RegistrationComponent
import { InvoiceService } from './invoice.service';  // Servis za račune
import { RegistrationService } from './services/registration.service';  // Servis za registraciju
import { AppRoutingModule } from './app.routes';  // Ako koristiš zaseban routing modul

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,  // Osiguraj se da se ovdje pravilno koristi ReactiveFormsModule
    AppRoutingModule,  // Uvezi AppRoutingModule za rutiranje
    provideHttpClient()  // Ovaj se sada koristi umjesto HttpClientModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent  // Registriraj RegistrationComponent
  ],
  providers: [
    InvoiceService,
    RegistrationService  // Registriraj servise
  ],
  bootstrap: [AppComponent]  // Pokreni aplikaciju s AppComponent
})
export class AppModule { }
