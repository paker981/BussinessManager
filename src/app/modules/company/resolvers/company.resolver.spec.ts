import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { companyResolver } from './company.resolver';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';

describe('companyResolver', () => {

  const bussinessHttpServiceMock = {
    getCompany: jest.fn()
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
  });

  it('should return company by id', () => {
     // given
     bussinessHttpServiceMock.getCompany.mockReturnValue({});

     // when
     const resolver = TestBed.runInInjectionContext(() => {
         return companyResolver( 
          { params: { id: '1' } } as unknown as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot);
       });
 
     // then
     expect(resolver).toStrictEqual({});
     expect(bussinessHttpServiceMock.getCompany).toHaveBeenCalled();
  });
});
