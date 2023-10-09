import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersListComponent } from './workers-list.component';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../../services/worker.service';
import { of } from 'rxjs';
import { NotifyWorkerDirective } from '../../directives/notify-worker.directive';
import { Worker } from 'src/app/interfaces/worker.interface';

describe('WorkersListComponent', () => {

  const workerServiceMock = {
    updateWorkerList: jest.fn(),
    workers$: of([])
  }

  const notifyWorkerDirectiveMock = {
    notifyWorker: jest.fn(),
  };

  let component: WorkersListComponent;
  let fixture: ComponentFixture<WorkersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkersListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { parent: { data: { company: { id: '1' } } } } } },
        { 
          provide: WorkerService,
          useValue: workerServiceMock
        }
      ]
    });
    fixture = TestBed.createComponent(WorkersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateWorkerList in ngAfterViewInit', () => {
    //given
    workerServiceMock.updateWorkerList.mockReturnValue([]);

    // Act/when
    component.ngAfterViewInit();

    // Assert/then
    expect(workerServiceMock.updateWorkerList).toHaveBeenCalled();
  });

  it('should call notifyWorker and updateWorkerList in onEdit', () => {
    // Arrange
    const testWorker: Worker = { id: '1', name: 'example', surname: 'mock', companyId: '1', university: '1' };
    // @ts-ignore
    const updateWorkerListSpy = jest.spyOn(component, 'updateWorkerList');
    component.notifyWorkerDirective = notifyWorkerDirectiveMock as unknown as NotifyWorkerDirective;

    // Act
    component.onEdit(testWorker);

    // Assert
    expect(notifyWorkerDirectiveMock.notifyWorker).toHaveBeenCalledWith(testWorker);
    expect(updateWorkerListSpy).toHaveBeenCalled();
  });

  it('should call updateWorkerList in onAdd', () => {
    // given
    // @ts-ignore
    const updateWorkerListSpy = jest.spyOn(component, 'updateWorkerList');

    // Act
    component.onAdd();

    // Assert
    expect(updateWorkerListSpy).toHaveBeenCalled();
  });

  it('should call updateWorkerList in onDelete', () => {
    // given
    // @ts-ignore
    const updateWorkerListSpy = jest.spyOn(component, 'updateWorkerList');

    // Act
    component.onDelete();

    // Assert
    expect(updateWorkerListSpy).toHaveBeenCalled();
  });

  it('should set dataSource in setTableValue', () => {
    // Arrange
    const testData: Worker[] = [{ id: '1', name: 'example', surname: 'mock', companyId: '1', university: '1' }];

    // Act
    // @ts-ignore
    component.setTableValue(testData);

    // Assert
    expect(component.dataSource.data).toEqual(testData);
  });





});
