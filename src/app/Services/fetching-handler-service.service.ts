import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchingHandlerService {
  public isLoading = new BehaviorSubject<boolean>(false);
}
