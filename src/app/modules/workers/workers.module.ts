import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkersListComponent } from './components/workers-list/workers-list.component';
import { MaterialModule } from '../shared/material/material.module';
import { WorkerDialogComponent } from './dialogs/worker-dialog/worker-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { UniversityDialogComponent } from './dialogs/university-dialog/university-dialog.component';



@NgModule({
  declarations: [
    WorkersListComponent,
    WorkerDialogComponent,
    SearchPipe,
    UniversityDialogComponent
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
