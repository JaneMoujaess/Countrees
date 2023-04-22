import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import {
  EMPTY,
  Observable,
  catchError,
  from,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class jwtHandlerService {
  constructor(private http: HttpClient) {}

  setAccessToken(accessToken: string): void {
    localStorage.setItem('AccessToken', accessToken);
  }
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('RefreshToken', refreshToken);
  }
  getAccessToken(): string {
    return localStorage.getItem('AccessToken')!;
  }
  getRefreshToken(): string {
    return localStorage.getItem('RefreshToken')!;
  }
  removeAccessToken(): void {
    localStorage.removeItem('AccessToken');
  }
  removeRefreshToken(): void {
    localStorage.removeItem('RefreshToken');
  }
  // refreshToken(refreshToken: string) {
  //   return this.http
  //     .post('http://173.249.40.235:5005/api/User/RefreshToken()', refreshToken)
  //     .pipe(tap((response) => console.log('Token is refreshed:', response)));
  // }
  refreshToken(refreshToken: string) {
    const headers = new HttpHeaders().set('Skip-Interceptor', '');
    const options = { headers };
    const body = { refreshToken };

    return this.http
      .post('http://173.249.40.235:5005/api/User/RefreshToken()', body, options)
      .pipe(tap((response) => console.log('Token is refreshed:', response)));
  }

  accessTokenIsExpired(): boolean {
    const decodedAccessToken: any = jwtDecode(this.getAccessToken());
    return decodedAccessToken.exp < Date.now() / 1000;
  }

  refreshTokenIsExpired(): boolean {
    const decodedRefreshToken: any = jwtDecode(this.getRefreshToken());
    return decodedRefreshToken.exp < Date.now() / 1000;
  }

  accessTokenIsValid(): boolean {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      if (this.accessTokenIsExpired()) return false;
      return true;
    }
    return false;
  }

  refreshTokenIsValid(): boolean {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      if (this.refreshTokenIsExpired()) return false;
      return true;
    }
    return false;
  }

  validate() {
    if (this.accessTokenIsValid()) return true;
    else {
      if (this.refreshTokenIsValid()) {
        console.log('Refreshing token...');
        const refreshToken = this.getRefreshToken();
        this.refreshToken(refreshToken).subscribe((data: any) => {
          const newAccessToken = data.AccessToken;
          const newRefreshToken = data.RefreshToken;
          this.setAccessToken(newAccessToken);
          this.setRefreshToken(newRefreshToken);
          console.log('Token refreshed');
        });
        return true;
      } else return false;
    }
  }
}
