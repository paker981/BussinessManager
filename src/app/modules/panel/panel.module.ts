import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './components/panel/panel.component';
import { PanelRoutingModule } from './panel-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { CompanyModule } from '../company/company.module';
import { WorkersListComponent } from '../workers/components/workers-list/workers-list.component';
import { WorkersModule } from '../workers/workers.module';



@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    MaterialModule,
    CompanyModule,
    WorkersModule
  ]
})
export class PanelModule { }
