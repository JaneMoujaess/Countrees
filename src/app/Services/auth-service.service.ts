import { Injectable } from '@angular/core';
import { User } from '../IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CountryService } from './country-service.service';
import { AdminService } from './admin-service.service';
import jwt_decode from 'jwt-decode';
import { jwtHandlerService } from './jwt-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private countryService: CountryService,
    private adminService: AdminService,
    private jwtHandlerService: jwtHandlerService
  ) {}

  createUser(newUser: User) {
    const data = newUser;
    const headers = new HttpHeaders().set('Skip-Interceptor', '');
    const options = { headers };
    return this.http
      .post('http://173.249.40.235:5005/api/User/SignUp()', data)
      .pipe(tap((response) => console.log('User created:', response, options)));
  }

  createAdmin(newAdmin: User) {
    const data = newAdmin;
    const headers = new HttpHeaders().set('Skip-Interceptor', '');
    const options = { headers };
    return this.http
      .post('http://173.249.40.235:5005/api/User/CreateAdminUser()', data)
      .pipe(
        tap((response) => console.log('Admin created:', response, options))
      );
  }

  login(email: string | null, password: string | null) {
    const url = 'http://173.249.40.235:5005/api/User/Login()';

    const body = {
      username: email,
      password: password,
    };

    const headers = new HttpHeaders().set('Skip-Interceptor', '');
    const options = { headers };

    return this.http.post(url, body).pipe(
      tap((response: any) => {
        this.jwtHandlerService.setAccessToken(response.Login.AccessToken);
        this.jwtHandlerService.setRefreshToken(response.Login.RefreshToken);
        console.log('User logged in:', response, options);
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => 'Wrong username or password');
      })
    );
  }

  logout() {
    this.jwtHandlerService.removeAccessToken();
    this.jwtHandlerService.removeRefreshToken();
    this.adminService.edit.next(false);
    this.countryService.filters = [];
    console.log('logout');
    this.router.navigate(['/login']);
  }
}
