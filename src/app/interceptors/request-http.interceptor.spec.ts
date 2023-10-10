import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorRespondInterceptor } from './error-respond.interceptor';
import { STORAGE_SERVICE } from '../tokens/storage.token';
import { RequestHttpInterceptor } from './request-http.interceptor';

describe('RequestHttpInterceptor', () => {
    const storageServiceMock = {
      getData: jest.fn()
    };
  
    let client: HttpClient
    let controller: HttpTestingController
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
            {
              provide: HTTP_INTERCEPTORS,
              useClass: RequestHttpInterceptor,
              multi: true
            },
            {
              provide: STORAGE_SERVICE,
              useValue: storageServiceMock
            }
          ]
      });

      client = TestBed.inject(HttpClient);;
      controller = TestBed.inject(HttpTestingController);
      jest.clearAllMocks();
    });
  
  
  
    it('should add Authorization header with Bearer token if token is available', fakeAsync(() => {
      // given
      const url = 'https://api.example.com/data';
      const token = 'fakeToken';
      storageServiceMock.getData.mockReturnValue(token);
      const responseSpy = jest.fn();
  
      // when
      client.get(url)
         .subscribe((response)=>responseSpy(response))
  
      const req = controller.expectOne(url);
      req.flush({});
  
      // then
      expect(responseSpy).toHaveBeenCalled();
      expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    }));

    it('should not add Authorization header with Bearer token if token is not available', fakeAsync(() => {
      // given
      const url = 'https://api.example.com/data';
      storageServiceMock.getData.mockReturnValue(null);
      const responseSpy = jest.fn();
  
      // when
      client.get(url)
         .subscribe((response)=>responseSpy(response))
  
      const req = controller.expectOne(url);
      req.flush({});
  
      // then
      expect(responseSpy).toHaveBeenCalled();
      expect(req.request.headers.has('Authorization')).toBeFalsy();
    }));
  
  });