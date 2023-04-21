import { Component, Input } from '@angular/core';
import { CountryService } from 'src/app/Services/CountryService';

@Component({
  selector: 'app-country-details-page',
  templateUrl: './country-details-page.component.html',
  styleUrls: ['./country-details-page.component.scss'],
})
export class CountryDetailsPageComponent {
  @Input() selectedCountryCode: string = '';

  selectedCountry: any;

  countries: any;
  borderingCountries: any;

  constructor(private countryService: CountryService) {}
  ngOnInit() {
    this.countryService
      .getCountryByCode(this.selectedCountryCode)
      .subscribe((data) => {
        this.selectedCountry = data[0];
      });

    this.countryService
      .getBorderingCountries(this.selectedCountryCode)
      .subscribe((data) => {
        this.borderingCountries = data;
        console.log(this.borderingCountries);
      });
  }
}
