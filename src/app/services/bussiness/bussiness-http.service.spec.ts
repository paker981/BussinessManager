import { TestBed } from '@angular/core/testing';

import { BussinessHttpService } from './bussiness-http.service';

describe('BussinessHttpService', () => {
  let service: BussinessHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BussinessHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
