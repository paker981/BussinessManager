import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Country } from '../../interfaces/country.interface';

describe('StateService', () => {
  let stateService: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        StateService
      ]
    });
    stateService = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(stateService).toBeTruthy();
  });

  it('should set and get sidenav state', () => {
    // given
    const mode: MatDrawerMode = 'side';
    const isOpen = true;

    // when
    stateService.setSidenavState(mode, isOpen);

    // then
    stateService.sidenavState$.subscribe((sidenavState) => {
      expect(sidenavState.mode).toEqual(mode);
      expect(sidenavState.isOpen).toEqual(isOpen);
    });
  });

  it('should update country state', () => {
    // given
    const newCountry: Country = Country.US;

    // when
    stateService.updateCountryState(newCountry);

    //then
    expect(stateService.selectedCountry).toEqual(newCountry);
  });
});