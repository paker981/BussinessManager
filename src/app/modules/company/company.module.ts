import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CompanyViewComponent } from './components/company-view/company-view.component';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { WorkersModule } from '../workers/workers.module';



@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    WorkersModule
  ],
  exports: [
    CompanyListComponent,
    CompanyViewComponent
  ]
})
export class CompanyModule { }
