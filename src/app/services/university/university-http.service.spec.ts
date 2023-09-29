import { TestBed } from '@angular/core/testing';

import { UniversityHttpService } from './university-http.service';

describe('UniversityHttpService', () => {
  let service: UniversityHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
