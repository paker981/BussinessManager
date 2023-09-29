import { TestBed } from '@angular/core/testing';
import { RequestHttpInterceptor } from './request-http.interceptor';



describe('RequestHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestHttpInterceptor = TestBed.inject(RequestHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
//commit