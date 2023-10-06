import { ChangeDetectorRef, Directive, EventEmitter, HostListener, Injectable, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, concatMap, tap, catchError, switchMap, Subject } from 'rxjs';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';
import { WorkerDialogComponent } from '../dialogs/worker-dialog/worker-dialog.component';
import { Worker } from 'src/app/interfaces/worker.interface';
import { UniversityDialogComponent } from '../dialogs/university-dialog/university-dialog.component';
import { WorkerService } from '../services/worker.service';

@UntilDestroy()
@Directive({
  selector: '[appNotifyWorker]'
})
export class NotifyWorkerDirective {

  @Input({required: true}) data!: Worker;
  
  @HostListener('click') onClick() {
    this.notifyWorker(this.data);
  }

  constructor(
    private dialog: MatDialog, 
    private bussinessHttpService: BussinessHttpService,
    private workerService: WorkerService
    ) { }


  notifyWorker(data: Worker){
    this.bussinessHttpService.notifyWorker(data.id).pipe(
      catchError(()=>this.openNotifyDialog(data)),
    ).subscribe()
  }
  
  private openNotifyDialog(data: Worker) {
    const dialogRef = this.dialog.open(UniversityDialogComponent, {
      width: '450px',
      height: '300px',
    });

    return dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((university) => (data.university = university)),
        concatMap(() => this.bussinessHttpService.updateWorker(data)),
        tap(() => this.workerService.updateWorkerList(data.companyId)),
        tap(() => this.notifyWorker(data)),
        )
  }
}
