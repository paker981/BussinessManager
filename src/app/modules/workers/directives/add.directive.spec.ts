import { Component, DebugElement } from '@angular/core';
import { AddDirective } from './add.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { By } from '@angular/platform-browser';
import { WorkerDialogComponent } from '../dialogs/worker-dialog/worker-dialog.component';
import { of } from 'rxjs';

describe('AddDirective', () => {
  @Component({
    template: '<button appAdd (workerAdded)="onWorkerAdded()">Add Worker</button>',
  })
  class ParentComponentMock {
    onWorkerAdded(): void {}
  }
  
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

    dialogMock.open.mockReturnValue({
      afterClosed: () => of(true),
     })
    bussinessHttpServiceMock.addWorker.mockReturnValue(of({}))

    fixture = TestBed.createComponent(ParentComponentMock);
    hostComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(AddDirective));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should open WorkerDialogComponent when button is clicked', () => {


    // Act
    directiveElement.triggerEventHandler('click', null);

    // Assert
    expect(dialogMock.open).toHaveBeenCalledWith(WorkerDialogComponent, {
      width: '400px',
      height: '500px',
    });
  });

  it('should call BussinessHttpService.addWorker and emit workerAdded event when worker is added', () => {
    // given
    const onWorkerAddedSpy = jest.spyOn(hostComponent, 'onWorkerAdded');

    // Act
    directiveElement.triggerEventHandler('click', null);

    // Assert
    expect(bussinessHttpServiceMock.addWorker).toHaveBeenCalled();
    expect(onWorkerAddedSpy).toHaveBeenCalled();
  });
});
