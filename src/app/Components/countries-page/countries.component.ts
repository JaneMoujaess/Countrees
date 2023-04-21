import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { CountryService } from 'src/app/Services/CountryService';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent {
  faUser = faUser;
  countries: any;
  selectedCountryCode: string = '';
  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getAllCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  // public getAllCountries() {
  //   this.countryService.getAllCountries();
  // }
  onCountrySelected($event: string) {
    // Find the selected country by name and set the selected country code
    const selectedCountry = this.countries.find(
      (country: any) => country.name.common === $event
    );
    console.log(selectedCountry);
    this.selectedCountryCode = selectedCountry.cca3;
    console.log(this.selectedCountryCode);
  }
}
