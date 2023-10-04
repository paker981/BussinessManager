import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, concatMap, tap } from 'rxjs';
import { WorkerDialogComponent } from '../dialogs/worker-dialog/worker-dialog.component';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';
import { Worker } from 'src/app/interfaces/worker.interface';
import { NotifyWorkerDirective } from './notify-worker.directive';


@UntilDestroy()
@Directive({
  selector: '[appEdit]'
})
export class EditDirective {
  @Input() data!: Worker;

  @Output() workerEdited = new EventEmitter<Worker>(); // workerEdited

  constructor(
    private dialog: MatDialog,
     private businessHttpService: BussinessHttpService
     ) {}

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(WorkerDialogComponent, {
      width: '400px',
      height: '500px',
      data: this.data,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        untilDestroyed(this),
        concatMap((worker: Worker) => this.businessHttpService.updateWorker(worker)),
        tap(()=>this.workerEdited.emit(this.data))
      )
      .subscribe();


  }
}
