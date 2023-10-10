import { Component, DebugElement } from '@angular/core';
import { EditDirective } from './edit.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { WorkerDialogComponent } from '../dialogs/worker-dialog/worker-dialog.component';
import { Worker } from 'src/app/interfaces/worker.interface';

@Component({
  template: '<button appEdit [data]="worker" (workerEdited)="onWorkerEdited()">Edit Worker</button>',
})
class ParentComponentMock {
  worker = workerMock;
  onWorkerEdited(): void {}
}

const workerMock: Worker = {
  id: '1',
  name: 'John',
  surname: 'Doe',
  companyId: '1',
  university: 'University 1',
}

describe('AddDirective', () => {
  
  const dialogMock = {
    open: jest.fn()
  };

  const bussinessHttpServiceMock = {
    updateWorker: jest.fn()
  };

  let fixture: ComponentFixture<ParentComponentMock>;
  let hostComponent: ParentComponentMock;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDirective, ParentComponentMock],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: BussinessHttpService, useValue: bussinessHttpServiceMock },
      ],
    });

    fixture = TestBed.createComponent(ParentComponentMock);
    hostComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(EditDirective));
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should open WorkerDialogComponent with data when button is clicked', () => {
    // Arrange
    const onWorkerEditedSpy = jest.spyOn(hostComponent, 'onWorkerEdited');
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true),
     })
    bussinessHttpServiceMock.updateWorker.mockReturnValue(of({}))

    // Act
    directiveElement.triggerEventHandler('click', null);
    
    // Assert
    expect(dialogMock.open).toHaveBeenCalledWith(WorkerDialogComponent, {
      width: '400px',
      height: '500px',
      data: workerMock
    });
    expect(bussinessHttpServiceMock.updateWorker).toHaveBeenCalled();
    expect(onWorkerEditedSpy).toHaveBeenCalled();
  });
});

