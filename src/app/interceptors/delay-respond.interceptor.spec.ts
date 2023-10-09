import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DelayRespondInterceptor } from './delay-respond.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('DelayRespondInterceptor', () => {
  let client: HttpClient
  let controller: HttpTestingController

  beforeEach(() => {
  
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DelayRespondInterceptor,
          multi: true
        }   
      ]
    });
      client = TestBed.inject(HttpClient);
      controller = TestBed.inject(HttpTestingController)
  });


  it('should delay the response by 300ms', fakeAsync(() => {
     // given
     const url = 'https://api.example.com/data';
     const responseData = { message: 'Success' };
     let response: any;
    

     // when
     client.get(url).subscribe((data) => {
       response = data;
     });

     const req = controller.expectOne(url); 
 
     req.flush(responseData);
 
     tick(300);
 
     // then
     expect(response).toEqual(responseData);
     controller.verify();
  }));

});
