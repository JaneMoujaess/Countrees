import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { catchError, of } from 'rxjs';
import { CountryService } from 'src/app/Services/country-service.service';

@Component({
  selector: 'app-country-search-bar',
  templateUrl: './country-search-bar.component.html',
  styleUrls: ['./country-search-bar.component.scss'],
})
export class CountrySearchBarComponent {
  faMagnifyingGlass = faMagnifyingGlass;

  searchString: string = '';

  constructor(private countryService: CountryService, private router: Router) {}

  onInput() {
    this.countryService.getFilteredCountries(this.searchString).subscribe();
  }
  // onInput() {
  //   this.countryService
  //     .getFilteredCountries(this.searchString)
  //     .pipe(
  //       catchError((error) => {
  //         if (error.status === 404) {
  //           this.router.navigate(['/**']);
  //         }
  //         return of(null);
  //       })
  //     )
  //     .subscribe();
  // }
}
