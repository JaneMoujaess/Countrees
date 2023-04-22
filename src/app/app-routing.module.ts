import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { CountriesComponent } from './Components/countries-page/countries.component';
import { CountryDetailsPageComponent } from './Components/country-details-page/country-details-page.component';
import { AuthPageComponent } from './Components/auth-page/auth-page.component';
import { AuthGuard, LoggedInAuthGuard } from './Services/guard-service.guard';
import { NotFoundComponent } from './Components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoggedInAuthGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  {
    path: 'countries',
    component: CountriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'countries/:countryName',
    component: CountryDetailsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
