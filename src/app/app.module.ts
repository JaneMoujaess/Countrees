import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './Components/auth-page/auth-page.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CountriesComponent } from './Components/countries-page/countries.component';
import { CountrySearchBarComponent } from './Components/country-search-bar/country-search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryCardComponent } from './Components/country-card/country-card.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CountryDetailsPageComponent } from './Components/country-details-page/country-details-page.component';
import { BackBarComponent } from './Components/back-bar/back-bar.component';
import { CountryProfileComponent } from './Components/country-profile/country-profile.component';
import { CountryInfoComponent } from './Components/country-info/country-info.component';
import { GalleryComponent } from './Components/gallery/gallery.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './Components/filter/filter.component';
import { JwtInterceptorService } from './Services/jwt-interceptor.service';
import { Routes } from '@angular/router';
import { AuthGuard } from './Services/guard-service.guard';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoadingComponent } from './Components/loading/loading.component';

// const routes: Routes = [
//   // {
//   //   path: '',
//   //   component: AuthPageComponent,
//   //   children: [
//   //     {
//   //       path: 'login',
//   //       component: LoginComponent,
//   //     },
//   //     { path: 'signup', component: SignupComponent },
//   //   ],
//   // },
//   // { path: 'login', component: LoginComponent },
//   // { path: 'signup', component: SignupComponent },
//   { path: '', component: CountriesComponent },
//   {
//     path: 'countries',
//     component: CountriesComponent,
//     canActivate: [AuthGuard],
//   },
//   { path: 'countries/:countryName', component: CountryDetailsPageComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LoginComponent,
    SignupComponent,
    CountriesComponent,
    CountrySearchBarComponent,
    CountryCardComponent,
    NavbarComponent,
    CountryDetailsPageComponent,
    BackBarComponent,
    CountryProfileComponent,
    CountryInfoComponent,
    GalleryComponent,
    FilterComponent,
    NotFoundComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    IvyCarouselModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
