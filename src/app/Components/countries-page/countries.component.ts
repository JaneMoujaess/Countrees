// import { Component } from '@angular/core';
// import { faUser } from '@fortawesome/free-regular-svg-icons';
// import { Country } from 'src/app/ICountry';
// import { CountryService } from 'src/app/Services/country-service.service';

// @Component({
//   selector: 'app-countries',
//   templateUrl: './countries.component.html',
//   styleUrls: ['./countries.component.scss'],
// })
// export class CountriesComponent {
//   faUser = faUser;
//   countries: Country[] = [];
//   showFilters: boolean = false;

//   constructor(private countryService: CountryService) {}

//   ngOnInit() {
//     this.countryService.filters$.subscribe(() => {
//       this.countryService.getFilteredCountries('').subscribe();
//     });
//     this.countryService.countries.subscribe((data) => {
//       this.countries = data;
//     });
//   }

//   onFilterIconClick() {
//     this.showFilters = !this.showFilters;
//   }
// }

import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Country } from 'src/app/ICountry';
import { CountryService } from 'src/app/Services/country-service.service';
import { LoadingService } from 'src/app/Services/loading-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  faUser = faUser;
  countries: Country[] = [];
  showFilters: boolean = false;
  isLoading: boolean = true;

  constructor(
    private countryService: CountryService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.countryService.filters$.subscribe(() => {
      this.countryService.getFilteredCountries('').subscribe();
    });
    this.countryService.countries.subscribe((data) => {
      this.countries = data;
    });
    this.loadingService.isLoading.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  onFilterIconClick() {
    this.showFilters = !this.showFilters;
  }
}
