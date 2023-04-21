import { Injectable } from '@angular/core';
import { User } from '../IUser';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public isAdmin = new BehaviorSubject<boolean>(false);
  public edit = new BehaviorSubject<boolean>(false);
}
