import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private countries: BehaviorSubject<any> = new BehaviorSubject(null);
  private borderingCountries: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    if (this.countries.value) {
      // return cached data if available
      return this.countries.asObservable();
    } else {
      // fetch data from API
      return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
        tap((data) => {
          this.countries.next(data); // store fetched data in service
        })
      );
    }
  }

  getBorderingCountries(countryCode: string): Observable<any[]> {
    if (this.borderingCountries.value) {
      // return cached data if available
      return this.borderingCountries.asObservable();
    } else {
      // Otherwise, proceed with finding the bordering countries
      return this.getCountryByCode(countryCode).pipe(
        switchMap((country: any) => {
          const borders = country[0].borders;
          return this.getCountriesByCodes(borders);
        }),
        tap((data) => {
          this.borderingCountries.next(data); // store fetched data in service
        })
      );
    }
  }

  getCountriesByCodes(codes: string[]): Observable<any[]> {
    const url = `${'https://restcountries.com/v3.1/alpha'}?codes=${codes.join(
      ','
    )}`;
    return this.http.get<any[]>(url);
  }

  getCountryByCode(code: string): Observable<any> {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    return this.http.get(url);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, of, switchMap, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class CountryService {
//   private countries: any;
//   private borderingCountries: any;
//   constructor(private http: HttpClient) {}

//   getAllCountries(): Observable<any[]> {
//     if (this.countries) {
//       // return cached data if available
//       return of(this.countries);
//     } else {
//       // fetch data from API
//       return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
//         tap((data) => {
//           this.countries = data; // store fetched data in service
//         })
//       );
//     }
//   }

//   getBorderingCountries(countryCode: string): Observable<any[]> {
//     if (this.borderingCountries) {
//       // return cached data if available
//       return of(this.borderingCountries);
//     } else {
//       // Otherwise, proceed with finding the bordering countries
//       return this.getCountryByCode(countryCode).pipe(
//         switchMap((country: any) => {
//           const borders = country[0].borders;
//           return this.getCountriesByCodes(borders);
//         }),
//         tap((data) => {
//           this.borderingCountries = data; // store fetched data in service
//         })
//       );
//     }
//   }

//   getCountriesByCodes(codes: string[]): Observable<any[]> {
//     const url = `${'https://restcountries.com/v3.1/alpha'}?codes=${codes.join(
//       ','
//     )}`;
//     return this.http.get<any[]>(url);
//   }

//   getCountryByCode(code: string): Observable<any> {
//     const url = `https://restcountries.com/v3.1/alpha/${code}`;
//     return this.http.get(url);
//   }
// }
