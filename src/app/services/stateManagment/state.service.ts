import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { Country } from 'src/app/interfaces/country.interface';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _countryStateSubject = new BehaviorSubject<Country>(Country.PL);
  private _sidenavStateSubject = new BehaviorSubject<{ mode: MatDrawerMode, isOpen: boolean }>({ mode: 'side', isOpen: false });

  sidenavState$ = this._sidenavStateSubject.asObservable();

  get selectedCountry() {
    return this._countryStateSubject.getValue();
  }

  setSidenavState(mode: MatDrawerMode, isOpen: boolean): void {
    this._sidenavStateSubject.next({ mode, isOpen });
  }

  updateCoutryState(newData: Country): void {
    this._countryStateSubject.next(newData);
  }
}
