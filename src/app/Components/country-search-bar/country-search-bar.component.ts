import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-country-search-bar',
  templateUrl: './country-search-bar.component.html',
  styleUrls: ['./country-search-bar.component.scss']
})
export class CountrySearchBarComponent {
  faMagnifyingGlass=faMagnifyingGlass;
}
