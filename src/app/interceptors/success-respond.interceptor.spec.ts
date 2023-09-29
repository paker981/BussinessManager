import { TestBed } from '@angular/core/testing';

import { SuccessRespondInterceptor } from './success-respond.interceptor';

describe('SuccessRespondInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SuccessRespondInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SuccessRespondInterceptor = TestBed.inject(SuccessRespondInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
//commit