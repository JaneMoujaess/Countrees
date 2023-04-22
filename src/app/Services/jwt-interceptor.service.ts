import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { jwtHandlerService } from './jwt-handler.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private jwtHandlerService: jwtHandlerService,
    private authService: AuthService
  ) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
  //   // add auth header with jwt if account is logged in and request is to the api url
  //   if (
  //     request.url.includes('/Login()') ||
  //     request.url.includes(
  //       '/RefreshToken()' ||
  //         request.url.includes(
  //           '/CreateAdminUser()' || request.url.includes('/SignUp()')
  //         )
  //     )
  //   ) {
  //     console.log('should skip');
  //     return next.handle(request);
  //   }
  //   const accessToken = this.jwtHandlerService.getAccessToken();
  //   if (accessToken) {
  //     const accessTokenIsExpired =
  //       this.jwtHandlerService.accessTokenIsExpired();
  //     if (accessTokenIsExpired) {
  //       console.log('Access token expired');
  //       const refreshToken = this.jwtHandlerService.getRefreshToken();
  //       if (!refreshToken) {
  //         console.log('No refresh token available, redirecting to login page');
  //         this.router.navigate(['/login']);
  //         this.authService.logout();
  //         return throwError(() => 'No refresh token available');
  //       }
  //       const refreshTokenIsExpired =
  //         this.jwtHandlerService.refreshTokenIsExpired();
  //       if (refreshTokenIsExpired) {
  //         console.log('Refresh token expired, redirecting to login page');
  //         this.router.navigate(['/login']);
  //         this.authService.logout();
  //         return throwError(() => 'Refresh token expired');
  //       }
  //       //Refresh Token isn't expired
  //       console.log('Refreshing token...');
  //       this.jwtHandlerService
  //         .refreshToken(refreshToken)
  //         .subscribe((data: any) => {
  //           const newAccessToken = data.AccessToken;
  //           const newRefreshToken = data.RefreshToken;
  //           this.jwtHandlerService.setAccessToken(newAccessToken);
  //           this.jwtHandlerService.setRefreshToken(newRefreshToken);
  //           console.log('Token refreshed');
  //           request = request.clone({
  //             setHeaders: { Authorization: `Bearer ${newAccessToken}` },
  //           });
  //           return next.handle(request);
  //         }),
  //         catchError((error) => {
  //           console.log('Error refreshing token:', error);
  //           this.router.navigate(['/login']);
  //           this.authService.logout();
  //           return throwError(() => error);
  //         });
  //     } else {
  //       console.log('Access token not expired');
  //       request = request.clone({
  //         setHeaders: { Authorization: `Bearer ${accessToken}` },
  //       });
  //     }
  //   }
  //   const refreshToken = this.jwtHandlerService.getRefreshToken();
  //   if (!refreshToken) {
  //     console.log('No refresh token available, redirecting to login page');
  //     this.router.navigate(['/login']);
  //     this.authService.logout();
  //     return throwError(() => 'No refresh token available');
  //   }
  //   const refreshTokenIsExpired =
  //     this.jwtHandlerService.refreshTokenIsExpired();
  //   if (refreshTokenIsExpired) {
  //     console.log('Refresh token expired, redirecting to login page');
  //     this.router.navigate(['/login']);
  //     this.authService.logout();
  //     return throwError(() => 'Refresh token expired');
  //   }
  //   //Refresh Token isn't expired
  //   console.log('Refreshing token...');
  //   this.jwtHandlerService.refreshToken(refreshToken).subscribe((data: any) => {
  //     const newAccessToken = data.AccessToken;
  //     const newRefreshToken = data.RefreshToken;
  //     this.jwtHandlerService.setAccessToken(newAccessToken);
  //     this.jwtHandlerService.setRefreshToken(newRefreshToken);
  //     console.log('Token refreshed');
  //     request = request.clone({
  //       setHeaders: { Authorization: `Bearer ${newAccessToken}` },
  //     });
  //     return next.handle(request);
  //   }),
  //     catchError((error) => {
  //       console.log('Error refreshing token:', error);
  //       this.router.navigate(['/login']);
  //       this.authService.logout();
  //       return throwError(() => error);
  //     });
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // add auth header with jwt if account is logged in
    if (
      request.url.includes('/Login()') ||
      request.url.includes('/RefreshToken()') ||
      request.url.includes('/CreateAdminUser()') ||
      request.url.includes('/SignUp()')
    ) {
      console.log('should skip');
      return next.handle(request);
    }

    if (this.jwtHandlerService.validate())
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtHandlerService.getAccessToken()}`,
        },
      });
    else {
      this.router.navigate(['/login']);
      this.authService.logout();
    }
    return next.handle(request);
  }
}
