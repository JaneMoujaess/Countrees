import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/Services/country-service.service';

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
