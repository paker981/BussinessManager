import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversityHttpService {
  private _universityUrl = environment.universityUrl;

  constructor(private http: HttpClient) { }

  getUniversities(): Observable<any> {
    const params = new HttpParams().set('country', "Poland");
    return this.http.get(this._universityUrl, {params})
  }
}
