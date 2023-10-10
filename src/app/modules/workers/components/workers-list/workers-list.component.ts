import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscriber, catchError, concatMap, delay, filter, map, mergeMap, of, retry, retryWhen, switchMap, tap, throwError } from 'rxjs';
import { University } from 'src/app/interfaces/university.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { UniversityHttpService } from 'src/app/services/university/university-http.service';
import { WorkerDialogComponent } from '../../dialogs/worker-dialog/worker-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UniversityDialogComponent } from '../../dialogs/university-dialog/university-dialog.component';
import { NotifyWorkerDirective } from '../../directives/notify-worker.directive';
import { WorkerService } from '../../services/worker.service';

@UntilDestroy()
@Component({
  selector: 'app-workers-list',
  templateUrl: './workers-list.component.html',
  styleUrls: ['./workers-list.component.scss'],
  // provide
})
export class WorkersListComponent implements AfterViewInit {

  @ViewChild(NotifyWorkerDirective) notifyWorkerDirective!: NotifyWorkerDirective;

  private _companyId!: string;

  workers$: Observable<Worker[]> = this.workerService.workers$.pipe(
    untilDestroyed(this),
    tap(data=>this.setTableValue(data))
  )

  displayedColumns: string[] = ['ID', 'name', 'surname', 'companyID','university','action'];
  dataSource: MatTableDataSource<Worker> = new MatTableDataSource<Worker>([]);

  // TODO: rozbij feature'y tego komponentu na dyrektywy funkcyjne
  
  constructor(
    private route: ActivatedRoute,
    private workerService: WorkerService
    ) {
      this._companyId =  this.route.snapshot.parent?.data['company']['id'];
    }
  
  ngAfterViewInit(): void {
    this.workerService.updateWorkerList(this._companyId);
  }

  onEdit(value: Worker) {
    this.notifyWorkerDirective.notifyWorker(value);
    this.updateWorkerList();
  }

  onAdd(){
    this.updateWorkerList()
  }

  onDelete(){
    this.updateWorkerList()
  }

  private setTableValue (value: Worker[]){
    this.dataSource = new MatTableDataSource<Worker>(value);
  }

  private updateWorkerList() {
    this.workerService.updateWorkerList(this._companyId);
  }
}
