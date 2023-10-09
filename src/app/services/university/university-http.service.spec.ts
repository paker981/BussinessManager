import { TestBed } from '@angular/core/testing';

import { UniversityHttpService } from './university-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StateService } from '../stateManagment/state.service';
import { Country } from '../../interfaces/country.interface';
import { environment } from '../../environment/environment';

describe('UniversityHttpService', () => {
  let service: UniversityHttpService;
  let httpMock: HttpTestingController;

  const stateServiceMock = {
    selectedCountry: Country.DE, 
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UniversityHttpService,
        { provide: StateService, useValue: stateServiceMock },
      ],
    });

    service = TestBed.inject(UniversityHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to get universities', () => {
    // given
    const responseMock = [{ name: 'University A' }, { name: 'University B' }];
    const resultSpy = jest.fn();

    // when
    service.getUniversities().subscribe((response) => {
      resultSpy(response)
    });

    const req = httpMock.expectOne(`${environment.universityUrl}?country=${stateServiceMock.selectedCountry}`);
    req.flush(responseMock);

    // then
    expect(req.request.method).toBe('GET');
    expect(resultSpy).toHaveBeenCalledWith(responseMock);
  });
});
