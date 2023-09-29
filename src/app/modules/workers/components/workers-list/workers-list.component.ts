import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscriber, catchError, concatMap, delay, filter, map, mergeMap, of, retry, retryWhen, switchMap, tap, throwError } from 'rxjs';
import { University } from 'src/app/interfaces/university.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { UniversityHttpService } from 'src/app/services/university/university-http.service';
import { WorkerDialogComponent } from '../../dialogs/worker-dialog/worker-dialog.component';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UniversityDialogComponent } from '../../dialogs/university-dialog/university-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss']
})
export class WorkersListComponent implements OnInit{

  // @Input({required: true}) set data (value: Worker[] | null) {
  //   if(value){
  //       this.setTableValue(value);
  //     }
  // }
  private _notifyWorker = new Subject<Worker>();
  private _companyId!: string;

  displayedColumns: string[] = ['ID', 'name', 'surname', 'companyID','university','action'];
  dataSource!: MatTableDataSource<Worker>;
  updateWorkersList$!: Observable<any>;// TODO: any 


  // TODO: rozbij feature'y tego komponentu na dyrektywy funkcyjne
  
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private bussinessHttpService: BussinessHttpService,
    ) {
    this._companyId =  this.route.snapshot.parent?.data['company'].data['_id'];
    const data = this.route.snapshot.data['workers'].data;
    this.setTableValue(data);
  }

  
  ngOnInit(): void {
    this._notifyWorker.pipe(
      untilDestroyed(this),
      switchMap((data: Worker)=>
        this.bussinessHttpService.notifyWorker(data._id).pipe(
          catchError(()=>this.openNotifyDialog(data))
        )
      ),
    ).subscribe()

    this.updateWorkersList$ = 
      this.bussinessHttpService.getWorkersFromCompany(this._companyId).pipe(
      tap((val)=>this.setTableValue(val.data))
    )
  }
  

  edit(data: Worker){
    const dialogRef = this.dialog.open(WorkerDialogComponent, { width: '400px',height: '500px' ,data: data}); 
  
    dialogRef.afterClosed().pipe(
      filter(Boolean), // {} // najlepiej true i false
      concatMap((data: Worker)=>this.bussinessHttpService.updateWorker(data)),
      switchMap(()=>this.updateWorkersList$),
      tap(()=>this.notifyWorker(data)),
      untilDestroyed(this),
    ).subscribe();
  }

  delete(id: string){
    this.bussinessHttpService.deleteWorker(id).pipe(
      switchMap(()=>this.updateWorkersList$),
      untilDestroyed(this)
    ).subscribe();
  }

  add() {
    const dialogRef = this.dialog.open(WorkerDialogComponent, { width: '400px',height: '500px' }); 

    dialogRef.afterClosed().pipe(
      filter(Boolean), // {} // najlepiej true i false
      concatMap((data: Worker)=>this.bussinessHttpService.addWorker(data)),
      switchMap(()=>this.updateWorkersList$),
      untilDestroyed(this),
    ).subscribe();
  }

  openNotifyDialog(data: Worker){
    const dialogRef = this.dialog.open(UniversityDialogComponent, { width: '450px',height: '300px'}); // { width: '400px',height: '400px', data: {jakies dane} } 
      
    return dialogRef.afterClosed().pipe(
      filter(Boolean), // {} // najlepiej true i false,
      tap((university)=>data.university=university),
      switchMap(()=>this.bussinessHttpService.updateWorker(data)),
      switchMap(()=>this.updateWorkersList$),
      concatMap(() => this.bussinessHttpService.notifyWorker(data._id))
    )
  }

  notifyWorker(value: Worker) {
    this._notifyWorker.next(value);
  }

  private setTableValue (value: Worker[]){
    this.dataSource = new MatTableDataSource<Worker>(value)
  }
}
