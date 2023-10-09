import { TestBed, fakeAsync } from '@angular/core/testing';
import { CanMatchFn, Router, UrlTree } from '@angular/router';

import { authGuard } from './auth.guard';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BussinessHttpService } from '../services/bussiness/bussiness-http.service';
import { Observable, of, throwError } from 'rxjs';

describe('authGuard', () => {

  const snackBarMock = {
    openFromComponent: jest.fn()
  };

  const bussinessHttpServiceMock = {
    getUserData: jest.fn()
  };

  const routerMock = { 
    createUrlTree: jest.fn() 
  };

  beforeEach(() => {
  TestBed.configureTestingModule({
      declarations: [],
      imports: [NoopAnimationsModule],
      providers: [
        {
          provide: BussinessHttpService,
          useValue: bussinessHttpServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: MatSnackBar,
          useValue: snackBarMock
        }],
        schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    

  });

it('should return true if getUserData succeeds', fakeAsync (() => {
  // given
  bussinessHttpServiceMock.getUserData.mockReturnValue(of({}));
  const resultSpy = jest.fn()

  // when
  TestBed.runInInjectionContext(() => {
      (authGuard({}, []) as Observable<Object>).subscribe((result) => {
        resultSpy(result);
      })
    });

  // then
  expect(resultSpy).toHaveBeenCalledWith(true);
  expect(bussinessHttpServiceMock.getUserData).toHaveBeenCalled();
  expect(snackBarMock.openFromComponent).not.toHaveBeenCalled();
}));

it('should handle error and return UrlTree if getUserData fails', () => {
  // given
  const errorResponse = new Error('Test error');
  bussinessHttpServiceMock.getUserData.mockReturnValue(throwError(()=>errorResponse));
  const urlTree = {} as UrlTree;
  routerMock.createUrlTree.mockReturnValue(urlTree);
  const resultSpy = jest.fn()

  // when
  TestBed.runInInjectionContext(() => {
      (authGuard({}, []) as Observable<Object>).subscribe((result) => {
        resultSpy(result);
      });
    });

  // then
  expect(resultSpy).toHaveBeenCalledWith(urlTree);
  expect(bussinessHttpServiceMock.getUserData).toHaveBeenCalled();
  expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  expect(routerMock.createUrlTree).toBeCalledWith(['/auth']);
});

});