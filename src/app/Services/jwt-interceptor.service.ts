import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // add auth header with jwt if account is logged in and request is to the api url
    const token = this.authService.getAccessToken();
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(request);

    // .pipe(
    //   catchError((err) => {
    //     // if (404 === err.status) {
    //     //   this.router.navigate(['/**']);
    //     // }
    //     console.log(err);
    //     console.log('interceptor');
    //     return throwError(() => err);
    //   })
    // );
  }
}
