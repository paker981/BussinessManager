import { Injectable } from '@angular/core';
import { untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, Subject, switchMap } from 'rxjs';
import { Worker } from 'src/app/interfaces/worker.interface';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private _updateWorkersList = new Subject<string>();

  workers$: Observable<Worker[]> = this._updateWorkersList.asObservable().pipe(
    // untilDestroyed(this),
    switchMap((id: string)=> this.bussinessHttpService.getWorkersFromCompany(id))
    )
  
  constructor(private bussinessHttpService: BussinessHttpService) {}

  updateWorkerList(companyId: string){
    this._updateWorkersList.next(companyId);
  }
}
