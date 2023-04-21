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

  constructor() {
    // this.countryName = 'France';
    // this.countryFlagUrl =
    //   'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png';
    // this.capitalName = 'Paris';
  }
}
