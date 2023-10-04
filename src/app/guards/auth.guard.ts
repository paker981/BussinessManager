import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { BussinessHttpService } from '../services/bussiness/bussiness-http.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../components/custom-snack-bar/custom-snack-bar.component';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

export const authGuard: CanMatchFn = (route, segments) => {
  const bussinessHttpService = inject(BussinessHttpService);
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);

  return bussinessHttpService.getUserData().pipe(
    map(()=>true),
    catchError(()=>{
      CustomSnackBarComponent.openErrorSnackBar(snackBar,'No permission, signUp first!', 'Close');
      return of(router.createUrlTree(['/auth']));
    })
  )
};
