import { Injectable } from '@angular/core';
import { User } from '../IUser';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CountryService } from './country-service.service';
import { AdminService } from './admin-service.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private countryService: CountryService,
    private adminService: AdminService
  ) {}

  createUser(newUser: User) {
    const data = newUser;
    return this.http
      .post('http://173.249.40.235:5005/api/User/SignUp()', data)
      .pipe(tap((response) => console.log('User created:', response)));
  }

  createAdmin(newAdmin: User) {
    const data = newAdmin;
    return this.http
      .post('http://173.249.40.235:5005/api/User/CreateAdminUser()', data)
      .pipe(tap((response) => console.log('Admin created:', response)));
  }

  login(email: string | null, password: string | null) {
    const url = 'http://173.249.40.235:5005/api/User/Login()';

    const body = {
      username: email,
      password: password,
    };

    return this.http.post(url, body).pipe(
      tap((response: any) => {
        localStorage.setItem('AccessToken', response.Login.AccessToken);
        localStorage.setItem('RefreshToken', response.Login.RefreshToken);
        console.log('User logged in:', response);

        // const token = this.getAccessToken();
        // const decodedToken: any = jwt_decode(token);
        // this.adminService.isAdmin.next(
        //   decodedToken.realm_access.roles.includes('Admin') ? true : false
        // );
      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => 'Wrong username or password');
      })
    );
  }

  getAccessToken(): string {
    return localStorage.getItem('AccessToken')!;
  }

  logout() {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    this.adminService.edit.next(false);
    this.countryService.filters = [];
    console.log('logout');
    this.router.navigate(['/login']);
  }
}
