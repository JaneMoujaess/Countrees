import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/ICountry';
import { AuthService } from 'src/app/Services/auth-service.service';
import { CountryService } from 'src/app/Services/country-service.service';
import jwt_decode from 'jwt-decode';
import { AdminService } from 'src/app/Services/admin-service.service';
import { jwtHandlerService } from 'src/app/Services/jwt-handler.service';
import { FetchingHandlerService } from 'src/app/Services/fetching-handler-service.service';

@Component({
  selector: 'app-country-details-page',
  templateUrl: './country-details-page.component.html',
  styleUrls: ['./country-details-page.component.scss'],
})
export class CountryDetailsPageComponent {
  selectedCountryName: string = '';
  selectedCountry: any = null;
  borderingCountries: Country[] = [];
  languages: string = '';
  isLoading: boolean = false;

  constructor(
    private countryService: CountryService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private jwtHandlerService: jwtHandlerService,
    private fetchingHandlerService: FetchingHandlerService
  ) {}

  ngOnInit() {
    const token = this.jwtHandlerService.getAccessToken();
    const decodedToken: any = jwt_decode(token);
    this.adminService.isAdmin.next(
      decodedToken.realm_access.roles.includes('Admin') ? true : false
    );

    this.route.params.subscribe((params) => {
      this.selectedCountryName = params['countryName'];
      this.countryService
        .getCountryByName(this.selectedCountryName)
        .subscribe((fetchedCountry) => {
          this.selectedCountry = fetchedCountry;
          this.languages = Object.values(fetchedCountry.languages).join(', ');
          this.countryService
            .getBorderingCountries(fetchedCountry.cca3)
            .subscribe((fetchedBorderingCountries) => {
              this.borderingCountries = fetchedBorderingCountries;
            });
        });
    });
    this.fetchingHandlerService.isLoading.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }
}
