
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResolveFn } from '@angular/router';
import { map } from 'rxjs';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { UserDetails } from 'src/app/interfaces/user.inteface';
import { BussinessHttpService } from '../../services/bussiness/bussiness-http.service';


export const panelDataResolver: ResolveFn<any> = (route, state) => {

  const bussinessHttpService = inject(BussinessHttpService);
  
  return bussinessHttpService.getUserData(); 
};
