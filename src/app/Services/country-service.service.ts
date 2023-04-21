import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  BehaviorSubject,
  tap,
  switchMap,
  map,
  of,
  combineLatest,
} from 'rxjs';
import { Country } from '../ICountry';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  public countries = new BehaviorSubject<Country[]>([]);
  public filters$ = new BehaviorSubject<string[]>([]);
  public filters: string[] = [];

  constructor(private http: HttpClient) {}

  activateFilter(continents: string[]) {
    this.filters = continents;
    this.filters$.next(this.filters);
  }

  //Without filtering
  // getAllCountries(): Observable<Country[]> {
  //   return this.http.get<Country[]>('https://restcountries.com/v3.1/all').pipe(
  //     tap((data) => {
  //       this.countries.next(data);
  //     })
  //   );
  // }

  getBorderingCountries(countryCode: string): Observable<Country[]> {
    return this.getCountryByCode(countryCode).pipe(
      switchMap((country: Country) => {
        const borders = country.borders;
        return this.getCountriesByCodes(borders);
      })
    );
  }

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all').pipe(
      map((countries) => this.applyFilters(countries, this.filters)),
      tap((filteredCountries) => this.countries.next(filteredCountries))
    );
  }

  getFilteredCountries(searchString: string): Observable<Country[]> {
    const url = `https://restcountries.com/v3.1/name/${searchString}`;
    if (!searchString) {
      return this.getAllCountries();
    }
    return combineLatest([this.filters$, this.http.get<Country[]>(url)]).pipe(
      map(([filters, searchedCountries]) => {
        const filteredCountries = this.applyFilters(searchedCountries, filters);
        return filteredCountries;
      }),
      tap((filteredCountries) => this.countries.next(filteredCountries))
    );
  }

  applyFilters(countries: Country[], filters: string[]): Country[] {
    let filteredCountries = countries;
    if (filters.length > 0) {
      filteredCountries = countries.filter((country) =>
        filters.includes(country.continents[0])
      );
    }
    return filteredCountries;
  }

  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    if (codes === undefined) return of([]);
    else {
      const url = `${'https://restcountries.com/v3.1/alpha'}?codes=${codes.join(
        ','
      )}`;
      return this.http.get<any[]>(url);
    }
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`https://restcountries.com/v3.1/region/${region}`)
      .pipe(
        tap((filteredCountries) => {
          this.countries.next(filteredCountries);
        })
      );
  }

  getCountryByCode(code: string): Observable<Country> {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    return this.http
      .get<Country[]>(url)
      .pipe(map((response: Country[]) => response[0]));
  }

  getCountryByName(name: string | null): Observable<Country> {
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    return this.http
      .get<Country[]>(url)
      .pipe(map((response: Country[]) => response[0]));
  }
}
