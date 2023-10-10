import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { panelDataResolver } from './panel-data.resolver';
import { BussinessHttpService } from '../../services/bussiness/bussiness-http.service';

describe('panelDataResolver', () => {
  const bussinessHttpServiceMock = {
    getUserData: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: BussinessHttpService,
          useValue: bussinessHttpServiceMock
        }
      ]

    }).compileComponents();
    jest.clearAllMocks();
  });

  it('should return user data', () => {
     // given
     bussinessHttpServiceMock.getUserData.mockReturnValue({});

     // when
     const resolver = TestBed.runInInjectionContext(() => {
         return panelDataResolver(
          {} as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot
          );
       });
 
     // then
     expect(resolver).toStrictEqual({});
     expect(bussinessHttpServiceMock.getUserData).toHaveBeenCalled();
  });
});
