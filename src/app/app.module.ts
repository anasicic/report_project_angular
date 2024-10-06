import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component'; // Uvezi RegistrationComponent

@NgModule({
  declarations: [
    AppComponent,
    // Registruj RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RegistrationComponent // Dodaj RegistrationComponent ovdje
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


