import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './Components/auth-page/auth-page.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CountriesComponent } from './Components/countries-page/countries.component';
import { CountrySearchBarComponent } from './Components/country-search-bar/country-search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryCardComponent } from './Components/country-card/country-card.component';
import { FilterButtonComponent } from './Components/filter-button/filter-button.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CountryDetailsPageComponent } from './Components/country-details-page/country-details-page.component';
import { BackBarComponent } from './Components/back-bar/back-bar.component';
import { CountryProfileComponent } from './Components/country-profile/country-profile.component';
import { CountryInfoComponent } from './Components/country-info/country-info.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LoginComponent,
    SignupComponent,
    CountriesComponent,
    CountrySearchBarComponent,
    CountryCardComponent,
    FilterButtonComponent,
    NavbarComponent,
    CountryDetailsPageComponent,
    BackBarComponent,
    CountryProfileComponent,
    CountryInfoComponent,
    GalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    IvyCarouselModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
