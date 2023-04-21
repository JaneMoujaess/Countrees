import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CountryService } from 'src/app/Services/country-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  faFilter = faFilter;
  isClicked: boolean = false;
  @Input() showFilters: boolean = false;
  @Output() iconClick: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) {}

  ngOnInit() {}

  filtersForm = this.fb.group({
    Asia: false,
    Europe: false,
    Africa: false,
    NorthAmerica: false,
    Oceania: false,
  });

  onIconClick() {
    this.iconClick.emit();
    this.isClicked = !this.isClicked;
  }

  onSubmit() {
    let filters = [];
    this.isClicked = !this.isClicked;
    this.iconClick.emit();
    console.log(this.filtersForm.value);
    this.countryService.filters = [];
    if (this.filtersForm.value.Asia == true) filters.push('Asia');
    if (this.filtersForm.value.Africa == true) filters.push('Africa');
    if (this.filtersForm.value.Europe == true) filters.push('Europe');
    if (this.filtersForm.value.NorthAmerica == true)
      filters.push('North America');
    if (this.filtersForm.value.Oceania == true) filters.push('Oceania');
    this.countryService.activateFilter(filters);
  }
}
