import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input() name: string = '';
  @Input() continent: string = '';
  @Input() imageUrl: string = '';

  @Output() countrySelected = new EventEmitter<string>();

  onClick() {
    // Emit the selected country code to the parent component
    console.log(this.name);
    this.countrySelected.emit(this.name);
  }
}
