import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, concatMap, tap } from 'rxjs';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { WorkerDialogComponent } from '../dialogs/worker-dialog/worker-dialog.component';
import { Worker } from '../../../interfaces/worker.interface';

@UntilDestroy()
@Directive({
  selector: '[appAdd]'
})
export class AddDirective {
  
  @Output() workerAdded = new EventEmitter<void>(); // workerAdded

  constructor(private dialog: MatDialog, private bussinessHttpService: BussinessHttpService) {}

  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(WorkerDialogComponent, {
      width: '400px',
      height: '500px'
    });

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        concatMap((data: Worker)=>this.bussinessHttpService.addWorker(data)),
        tap(() => this.workerAdded.emit())
      )
      .subscribe();
  }
}
