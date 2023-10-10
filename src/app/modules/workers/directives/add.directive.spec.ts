import { Component, DebugElement } from '@angular/core';
import { AddDirective } from './add.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { By } from '@angular/platform-browser';
import { WorkerDialogComponent } from '../dialogs/worker-dialog/worker-dialog.component';
import { of } from 'rxjs';

@Component({
  template: '<button appAdd (workerAdded)="onWorkerAdded()">Add Worker</button>',
})
class ParentComponentMock {
  onWorkerAdded(): void {}
}

describe('AddDirective', () => {
  const dialogMock = {
    open: jest.fn()
  };

  const bussinessHttpServiceMock = {
    addWorker: jest.fn()
  };

  let fixture: ComponentFixture<ParentComponentMock>;
  let hostComponent: ParentComponentMock;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDirective, ParentComponentMock],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: BussinessHttpService, useValue: bussinessHttpServiceMock },
      ],
    });

    fixture = TestBed.createComponent(ParentComponentMock);
    hostComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(AddDirective));
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should open WorkerDialogComponent when button is clicked, BussinessHttpService.addWorker and emit workerAdded event when worker is added', () => { // zmiana logiki
    // Arrange
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true),
    });
    bussinessHttpServiceMock.addWorker.mockReturnValue(of({}));
    const onWorkerAddedSpy = jest.spyOn(hostComponent, 'onWorkerAdded');

    // Act
    directiveElement.triggerEventHandler('click', null);

    // Assert
    expect(dialogMock.open).toHaveBeenCalledWith(WorkerDialogComponent, {
      width: '400px',
      height: '500px',
    });
    expect(bussinessHttpServiceMock.addWorker).toHaveBeenCalled();
    expect(onWorkerAddedSpy).toHaveBeenCalled();
  });
});
