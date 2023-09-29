import { TestBed } from '@angular/core/testing';

import { DelayRespondInterceptor } from './delay-respond.interceptor';

describe('DelayRespondInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DelayRespondInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DelayRespondInterceptor = TestBed.inject(DelayRespondInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
//committt