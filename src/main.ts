import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Osigurajte da je putanja ispravna
import { AppComponent } from './app/app.component'; // Osigurajte da je putanja ispravna
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './app/services/auth.interceptor'; // Pruža AuthInterceptor
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Angular-ov token za interceptore

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Pruža rute
    provideHttpClient(withInterceptorsFromDi()), // Pruža HTTP klijent s interceptorima
    provideAnimationsAsync(), // Pruža animacije
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Pruža AuthInterceptor
  ]
}).catch(err => console.error(err));
