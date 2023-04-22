import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth-service.service';
import { jwtHandlerService } from './jwt-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHandlerService: jwtHandlerService
  ) {}

  canActivate() {
    if (this.jwtHandlerService.validate()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean {
  //   const accessToken = this.jwtHandlerService.getAccessToken();
  //   if (!accessToken) {
  //     // User is not authenticated, redirect to login page
  //     this.authService.logout();
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   const accessTokenIsExpired = this.jwtHandlerService.accessTokenIsExpired();
  //   if (accessTokenIsExpired) {
  //     const refreshToken = this.jwtHandlerService.getRefreshToken();
  //     if (!refreshToken) {
  //       // No refresh token, redirect to login page
  //       this.authService.logout();
  //       this.router.navigate(['/login']);
  //       return false;
  //     }
  //     const refreshTokenIsExpired =
  //       this.jwtHandlerService.refreshTokenIsExpired();
  //     if (refreshTokenIsExpired) {
  //       // Refresh token is expired, redirect to login page
  //       this.authService.logout();
  //       this.router.navigate(['/login']);
  //       return false;
  //     }
  //     // Access token is expired but refresh token is valid, refresh access token
  //     this.jwtHandlerService
  //       .refreshToken(refreshToken)
  //       .subscribe((data: any) => {
  //         const newAccessToken = data.AccessToken;
  //         const newRefreshToken = data.RefreshToken;
  //         this.jwtHandlerService.setAccessToken(newAccessToken);
  //         this.jwtHandlerService.setRefreshToken(newRefreshToken);
  //         console.log('Token refreshed');
  //       });
  //     return true;
  //   }
  //   // User is authenticated and access token is valid
  //   return true;
  // }
}

@Injectable({
  providedIn: 'root',
})
export class LoggedInAuthGuard {
  constructor(
    private router: Router,
    private jwtHandlerService: jwtHandlerService
  ) {}

  canActivate(): boolean {
    if (this.jwtHandlerService.getAccessToken()) {
      this.router.navigate(['/countries']);
      return false;
    } else {
      return true;
    }
  }
}
