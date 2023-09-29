import { TestBed } from '@angular/core/testing';

import { ErrorRespondInterceptor } from './error-respond.interceptor';

describe('ErrorRespondInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorRespondInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorRespondInterceptor = TestBed.inject(ErrorRespondInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
//commit