import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { WorkerDialogComponent } from './dialogs/worker-dialog/worker-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { UniversityDialogComponent } from './dialogs/university-dialog/university-dialog.component';
import { EditDirective } from './directives/edit.directive';
import { DeleteDirective } from './directives/delete.directive';
import { AddDirective } from './directives/add.directive';
import { NotifyWorkerDirective } from './directives/notify-worker.directive';


@NgModule({
  declarations: [
    WorkersListComponent,
    WorkerDialogComponent,
    SearchPipe,
    UniversityDialogComponent,
    EditDirective,
    DeleteDirective,
    AddDirective,
    NotifyWorkerDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    WorkersListComponent
  ]
})
export class WorkersModule { }
