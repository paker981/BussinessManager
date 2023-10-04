import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { StateService } from '../stateManagment/state.service';
import { Country } from 'src/app/interfaces/country.interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class UniversityHttpService {
  private _universityUrl = environment.universityUrl;

  constructor(
    private http: HttpClient,
    private stateService: StateService
    ) { 
      // this.stateService.countryData$.pipe(
      //   untilDestroyed(this),// gdy providedIn 'root' to niepotrzebne ale w innych przypadkach przydatne
      //   tap(data=>this._selectedCountry=data)
      // ).subscribe() 
    }

  getUniversities(): Observable<any> {
    const params = new HttpParams().set('country', this.stateService.selectedCountry);
    return this.http.get(this._universityUrl, {params})
  }
}
