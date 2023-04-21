import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySearchBarComponent } from './country-search-bar.component';

describe('CountrySearchBarComponent', () => {
  let component: CountrySearchBarComponent;
  let fixture: ComponentFixture<CountrySearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrySearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
