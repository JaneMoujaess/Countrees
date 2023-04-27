import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-country-profile',
  templateUrl: './country-profile.component.html',
  styleUrls: ['./country-profile.component.scss'],
})
export class CountryProfileComponent {
  @Input() countryName: string = '';
  @Input() countryFlagUrl: string = '';
  @Input() capitalName: string = '';
}
