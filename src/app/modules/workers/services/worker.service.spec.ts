import { TestBed } from '@angular/core/testing';

import { WorkerService } from './worker.service';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { Worker } from 'src/app/interfaces/worker.interface';
import { of } from 'rxjs';

describe('WorkerService', () => {
  let workerService: WorkerService;

  const bussinessHttpServiceMock = {
    getWorkersFromCompany: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkerService,
        { 
          provide: BussinessHttpService, 
          useValue: bussinessHttpServiceMock 
        }
      ]
    });
    workerService = TestBed.inject(WorkerService);
  });

  it('should be created', () => {
    expect(workerService).toBeTruthy();
  });

  it('should update workers list on calling updateWorkerList', () => {
    // given
    const resultSpy = jest.fn();
    const companyId = '1';
    const mockWorkers: Worker[] = [{
      id: '1',
      name: 'John',
      surname: 'Doe',
      companyId: '1',
      university: 'University 1',
    }];
    bussinessHttpServiceMock.getWorkersFromCompany.mockReturnValue(of(mockWorkers));


    // when
    workerService.workers$.subscribe((workers) => {
      resultSpy(workers);
    });
    workerService.updateWorkerList(companyId);

    // then 
    expect(bussinessHttpServiceMock.getWorkersFromCompany).toHaveBeenCalledWith(companyId);
    expect(resultSpy).toHaveBeenCalledWith(mockWorkers);
  });
});