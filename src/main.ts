import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Osigurajte da je putanja ispravna
import { AppComponent } from './app/app.component'; // Osigurajte da je putanja ispravna
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Pruža rute
    provideHttpClient(withInterceptorsFromDi()), // Pruža HTTP klijent s interceptorima
    provideAnimationsAsync() // Pruža animacije
  ]
}).catch(err => console.error(err));
