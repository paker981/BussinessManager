import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry } from 'rxjs';
import { environment } from '../../environment/environment';
import { AuthBodyRequest } from 'src/app/interfaces/auth.interface';
import { CompaniesData, Company, CompanyData } from 'src/app/interfaces/company.interface';
import { OrginalUserDetails, UserDetails } from 'src/app/interfaces/user.inteface';
import { CompanyWorkers, Worker, WorkerBody } from 'src/app/interfaces/worker.interface';

@Injectable({
  providedIn: 'root'
})
export class BussinessHttpService {
  private _apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  signUp(data: AuthBodyRequest): Observable<any> {
    return this.http.post(`${this._apiUrl}/auth/signUp`, data)
  }

  signIn(data: AuthBodyRequest): Observable<any> {
    return this.http.post(`${this._apiUrl}/auth/signIn`, data)
  }

  getUserData(): Observable<UserDetails> {
    return this.http.get<OrginalUserDetails>(`${this._apiUrl}/auth/user`).pipe(
      map(value=>({
        id: value._id,
        email: value.email
      }))
    )
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<CompaniesData>(`${this._apiUrl}/companies`).pipe(
      map((val)=>val.data),
      map(value=>
        value.map((value)=> ({
          id: value._id,
          name: value.name
        }))
      )
    )
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<CompanyData>(`${this._apiUrl}/companies/${id}`).pipe(
      map(val=>val.data),
      map(value=>({
          id: value._id,
          name: value.name
        })
      )
    ) 
  }

  getWorkersFromCompany(id: string): Observable<Worker[]> {
    return this.http.get<CompanyWorkers>(`${this._apiUrl}/companies/${id}/workers`).pipe(
      map(data=>data.data),
      map(value=>
        value.map((value)=> ({
          id: value._id,
          name: value.name,
          surname: value.surname,
          companyId: value.companyId,
          university: value.university
        }))
      )
    )   
  }

  updateWorker({id, ...body}: Worker): Observable<any> {
    return this.http.put(`${this._apiUrl}/workers/${id}`,body);
  }

  deleteWorker(id: string): Observable<any> {
    return this.http.delete(`${this._apiUrl}/workers/${id}`);
  }

  addWorker({id, ...body}: Worker): Observable<any> {
    return this.http.post(`${this._apiUrl}/workers`, body)
  }

  notifyWorker(id: string): Observable<any> {
    return this.http.get(`${this._apiUrl}/workers/${id}/notify`)
  }
}
