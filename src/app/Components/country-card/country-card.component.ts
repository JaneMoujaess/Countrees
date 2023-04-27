import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent {
  @Input() name: string = '';
  @Input() continent: string = '';
  @Input() imageUrl: string = '';

  constructor(private router: Router) {}

  onClick() {
    console.log(this.name);
    this.router.navigate(['/countries/' + this.name]);
  }
}
