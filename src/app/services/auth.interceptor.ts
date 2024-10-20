import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token'); // Dohvatite token iz localStorage
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Dodajte Bearer token u zaglavlje
        }
      });
    }
    
    return next.handle(request);
  }
}
