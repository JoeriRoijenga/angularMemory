import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(AuthService.TOKEN);

    if (token) {
      return next.handle(request.clone({
        setHeaders: {
          Authorization: `Bearer: ${token}`
        }
      }));
    }

    return next.handle(request);
  }

}
