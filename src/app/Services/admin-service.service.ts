import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public isAdmin = new BehaviorSubject<boolean>(false);
  public edit = new BehaviorSubject<boolean>(false);
}
