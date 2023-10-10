import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ErrorRespondInterceptor } from './error-respond.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../modules/Auth/services/auth.service';


describe('ErrorRespondInterceptor', () => {

  const snackBarMock = {
    openFromComponent: jest.fn()
  };

  const authServiceMock = {
    logOut: jest.fn()
  };


  let client: HttpClient
  let controller: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorRespondInterceptor,
          {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorRespondInterceptor,
            multi: true
          },
          {
            provide: MatSnackBar,
            useValue: snackBarMock
          },
          {
            provide: AuthService,
            useValue: authServiceMock
          }   
        ]
    });
    client = TestBed.inject(HttpClient);;
    controller = TestBed.inject(HttpTestingController);
    jest.clearAllMocks();
  });

  afterEach(()=>{
    controller.verify();
  })


  it('should handle HTTP errors and log out on 401 status', fakeAsync(() => {
    // given
    const url = 'https://api.example.com/data';
    const errorMessage = 'Unauthorized';
    const errorSpy = jest.fn();

    // when
    client.get(url)
       .subscribe({
        error: (error: HttpErrorResponse) => errorSpy(error.status)
       })

    const req = controller.expectOne(url);
    req.flush({ message: errorMessage }, { status: 401, statusText: 'Unauthorized' });

    // then
    expect(errorSpy).toHaveBeenCalledWith(401)
    expect(authServiceMock.logOut).toHaveBeenCalled();
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  }));

});