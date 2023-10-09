import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SuccessRespondInterceptor } from './success-respond.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../modules/Auth/services/auth.service';
import { ErrorRespondInterceptor } from './error-respond.interceptor';

describe('SuccessRespondInterceptor', () => {
  const snackBarMock = {
    openFromComponent: jest.fn()
  };

  let client: HttpClient
  let controller: HttpTestingController

  beforeEach(() => {
  
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SuccessRespondInterceptor,
          multi: true
        },
        {
          provide: MatSnackBar,
          useValue: snackBarMock
        } 
      ]
    });
      client = TestBed.inject(HttpClient);;
      controller = TestBed.inject(HttpTestingController);
  });



  it('should open success snackbar for successful response', fakeAsync(() => {
    // given
    const url = 'https://api.example.com/data';

    // when
    client.get(url)
       .subscribe();

    const req = controller.expectOne(url);
    req.flush({ message: 'Succeed!' });
    
    // then
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  }));

  it('should open success snackbar for response with status 204', fakeAsync(() => {
    // given
    const url = 'https://api.example.com/data';

    // when
    client.get(url)
       .subscribe();

    const req = controller.expectOne(url);
    req.flush({ status: 204 });
    
    // then
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  }));
});
