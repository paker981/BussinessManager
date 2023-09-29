import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { AuthBodyRequest } from 'src/app/interfaces/auth.interface';
import { CompaniesData, Company, CompanyData } from 'src/app/interfaces/company.interface';
import { UserDetails } from 'src/app/interfaces/user.inteface';
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

  getUserData(): Observable<any> {
    return this.http.get(`${this._apiUrl}/auth/user`)
  }

  getCompanies(): Observable<CompaniesData> {
    return this.http.get(`${this._apiUrl}/companies`) as Observable<CompaniesData>
  }

  getCompany(id: string): Observable<CompanyData> {
    return this.http.get(`${this._apiUrl}/companies/${id}`) as Observable<CompanyData>
  }

  getWorkersFromCompany(id: string): Observable<any> {
    return this.http.get(`${this._apiUrl}/companies/${id}/workers`) 
  }

  updateWorker({_id, ...body}: Worker): Observable<any> {
    return this.http.put(`${this._apiUrl}/workers/${_id}`,body);
  }

  deleteWorker(id: string): Observable<any> {
    return this.http.delete(`${this._apiUrl}/workers/${id}`);
  }

  addWorker({_id, ...body}: Worker): Observable<any> {
    return this.http.post(`${this._apiUrl}/workers`, body)
  }

  notifyWorker(id: string): Observable<any> {
    return this.http.get(`${this._apiUrl}/workers/${id}/notify`)
  }
}
