import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanelComponent } from "./components/panel/panel.component";
import { panelDataResolver } from "../resolvers/panel-data.resolver";
import { CompanyViewComponent } from "../company/components/company-view/company-view.component";
import { companyResolver } from "../company/resolvers/company.resolver";
import { WorkersListComponent } from "../workers/components/workers-list/workers-list.component";


const routes: Routes = [
    {
      path: '',
      component: PanelComponent,
      resolve: {user: panelDataResolver},
      children: [
            {
                path: 'company/:id',
                component: CompanyViewComponent,
                resolve:  {company: companyResolver},
                children: [
                   {
                     path: 'workers',
                     component: WorkersListComponent,
                   }
                ]
            },
          ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PanelRoutingModule {}