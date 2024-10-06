import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Pruža rute
    provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync() // Novi način za pružanje HttpClienta
  ]
}).catch(err => console.error(err));
