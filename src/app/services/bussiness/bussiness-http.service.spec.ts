import { TestBed } from '@angular/core/testing';
import { BussinessHttpService } from './bussiness-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthBodyRequest } from 'src/app/interfaces/auth.interface';
import { environment } from '../../environment/environment';
import { OrginalUserDetails, UserDetails } from 'src/app/interfaces/user.inteface';
import { CompaniesData } from 'src/app/interfaces/company.interface';
import { CompanyWorkers, Worker } from 'src/app/interfaces/worker.interface';
import { HttpClient } from '@angular/common/http';

describe('BussinessHttpService', () => {
  let service: BussinessHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
    });

    service = TestBed.inject(BussinessHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up', () => {
    // given
    const resultSpy = jest.fn();
    const mockSignUpData: AuthBodyRequest = {
      email: 'example@example.pl',
      password: '123'
    };

    // when
    service.signUp(mockSignUpData).subscribe(response => {
      resultSpy(response)
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/signUp`);
    req.flush({message: '1'});

    // then
    expect(req.request.method).toEqual('POST');
    expect(resultSpy).toHaveBeenCalled();
  });

  it('should sign in', () => {
    // given
    const resultSpy = jest.fn();
    const mockSignUpData: AuthBodyRequest = {
      email: 'example@example.pl',
      password: '123'
    };

    // when
    service.signIn(mockSignUpData).subscribe(response => {
      resultSpy(response)
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/signIn`);
    req.flush({});

    // then
    expect(req.request.method).toEqual('POST');
    expect(resultSpy).toHaveBeenCalled();
  });

  it('should get user data', () => {
    // given
    const resultSpy = jest.fn();
    const mockUserData: OrginalUserDetails = { _id: '1', email: 'example@example.com' };
    const expectedUserData: UserDetails = { id: '1', email: 'example@example.com' };

    // when
    service.getUserData().subscribe(data => {
      resultSpy(data);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/user`);
    req.flush(mockUserData);

    // then
    expect(req.request.method).toEqual('GET');
    expect(resultSpy).toHaveBeenCalledWith(expectedUserData);
  });

  it('should get companies', () => {
    // given
    const mockCompaniesData: CompaniesData = { message: 'succeed', data: [{_id: '1', name: 'exampleName'}] };
    const expectedCompanies = [ {id: '1', name: 'exampleName'} ];
    const resultSpy = jest.fn();

    // when
    service.getCompanies().subscribe(companies => {
      resultSpy(companies);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/companies`);
    req.flush(mockCompaniesData);

    // then
    expect(req.request.method).toEqual('GET');
    expect(resultSpy).toHaveBeenCalledWith(expectedCompanies);
  });

  it('should get company', () => {
    // given
    const companyId = 'exampleCompanyId';
    const mockCompanyData = { message: 'succeed', data: {_id: '1', name: 'exampleName'} };
    const expectedCompany = { id: '1', name: 'exampleName' };
    const resultSpy = jest.fn();

    // when
    service.getCompany(companyId).subscribe(company => {
      resultSpy(company)
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/companies/${companyId}`);
    req.flush(mockCompanyData);

    // then
    expect(req.request.method).toEqual('GET');
    expect(resultSpy).toHaveBeenCalledWith(expectedCompany);
  });

  it('should get workers from company', () => {
    // given
    const companyId = 'exampleCompanyId';
    const mockWorkersData: CompanyWorkers = 
    { 
      message: 'succeed', 
      data: [{_id: '1', name: 'bruno', surname: 'example', companyId: companyId, university: ''}] 
    };
    const expectedWorkers: Worker[] = [{id: '1', name: 'bruno', surname: 'example', companyId: companyId, university: ''}]
    const resultSpy = jest.fn();

    // when
    service.getWorkersFromCompany(companyId).subscribe(workers => {
      resultSpy(workers)
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/companies/${companyId}/workers`);
    req.flush(mockWorkersData);

    // then
    expect(req.request.method).toEqual('GET');
    expect(resultSpy).toHaveBeenCalledWith(expectedWorkers);
  });

  it('should update worker', () => {
    // given
    const mockWorker: Worker = {id: '1', name: 'bruno', surname: 'example', companyId: '1', university: ''};
    const resultSpy = jest.fn();

    // when
    service.updateWorker(mockWorker).subscribe(response => {
      resultSpy(response);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/workers/${mockWorker.id}`);
    req.flush({});

    // then
    expect(req.request.method).toEqual('PUT');
    expect(resultSpy).toHaveBeenCalled();
  });

  it('should delete worker', () => {
    // given
    const workerId = 'exampleWorkerId';
    const resultSpy = jest.fn();

    // when
    service.deleteWorker(workerId).subscribe(response => {
      resultSpy(response);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/workers/${workerId}`);
    req.flush({});
    
    // then
    expect(req.request.method).toEqual('DELETE');
    expect(resultSpy).toHaveBeenCalled();
  });

  it('should add worker', () => {
    // given
    const mockWorker: Worker = {id: '1', name: 'bruno', surname: 'example', companyId: '1', university: ''};
    const resultSpy = jest.fn();

    // when
    service.addWorker(mockWorker).subscribe(response => {
      resultSpy(response);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/workers`);
    req.flush({});

    // then
    expect(req.request.method).toEqual('POST');
    expect(resultSpy).toHaveBeenCalled();
  });

  it('should notify worker', () => {
    // given
    const workerId = 'exampleWorkerId';
    const resultSpy = jest.fn();

    // when
    service.notifyWorker(workerId).subscribe(response => {
      resultSpy(response);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/workers/${workerId}/notify`);
    req.flush({});

    // then
    expect(req.request.method).toEqual('GET');
    expect(resultSpy).toHaveBeenCalled();
  });
});