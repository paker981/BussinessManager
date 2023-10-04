import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../modules/Auth/services/auth.service';
import { CustomSnackBarComponent } from '../components/custom-snack-bar/custom-snack-bar.component';

@Injectable()
export class ErrorRespondInterceptor implements HttpInterceptor {

  private readonly ERROR_MESSAGE = 'Error occurred!';

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        this.statusRespondHandler(error);
        
        return throwError(() => {
          return error;
        })
      })
    )
  }

  private statusRespondHandler (error: HttpErrorResponse){

    if(error.status){
      if (error.status === 401) {
        this.authService.logOut();
      }

      this.messageRespondHandler(error.error);
    }
  }
  
  private messageRespondHandler (error: {}) {
    if('message' in error && typeof error.message === 'string'){
      const message = error.message || this.ERROR_MESSAGE;
       this.openErrorSnackBar(message);
    }
  }
  
  private openErrorSnackBar(message: string = this.ERROR_MESSAGE): void {
    CustomSnackBarComponent.openErrorSnackBar(this.snackBar, message, 'Close');
  }
}
