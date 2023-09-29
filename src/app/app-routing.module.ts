import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './modules/Auth/components/auth/auth.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'panel',
    loadChildren: () => import("./modules/panel/panel.module").then(m => m.PanelModule),
    canMatch: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
