import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, delay, map, tap } from 'rxjs';
import { CustomSnackBarComponent } from '../components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SuccessRespondInterceptor implements HttpInterceptor {

  private message = '';
  private readonly SUCCESS_MESSAGE = 'Success!';

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<undefined>) => { // <--- TODO: any - poczytaj o typach
        // TODO: rozbić na 2 pozytywny i z errorem     
        if(event instanceof HttpResponse) {
          return this.statusRespondHandler(event);
        }

        return event;
      })
    )
  }

  private bodyRespondHandler (body: {}) {
    if('message' in body && typeof body.message === 'string'){
      const message = body.message || this.SUCCESS_MESSAGE;
       this.openSuccessSnackBar(message);
    }
  }

  private statusRespondHandler (event: HttpResponse<undefined>){
    const successRespondWithBody = event.status >= 200 && event.status < 300 && event.body;

    if(event.status){
      if(event.status === 204){
        this.openSuccessSnackBar();
        return event;
      }

      if (successRespondWithBody) {
        this.bodyRespondHandler(event.body)
      }
    }

    return event;
  }

  private openSuccessSnackBar(message: string = this.SUCCESS_MESSAGE): void {
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar, message, 'Close');
  }
}

