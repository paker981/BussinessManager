import { Component, DebugElement } from '@angular/core';
import { DeleteDirective } from './delete.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDirective } from './add.directive';
import { MatDialog } from '@angular/material/dialog';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DeleteDirective', () => {
  @Component({
    template: '<button appDelete (workerDeleted)="onWorkerDeleted()">Delete Worker</button>',
  })
  class ParentComponentMock {
    onWorkerDeleted(): void {}
  }

  const bussinessHttpServiceMock = {
    deleteWorker: jest.fn()
  };

  let fixture: ComponentFixture<ParentComponentMock>;
  let hostComponent: ParentComponentMock;
  let directiveElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDirective, ParentComponentMock],
      providers: [
        { provide: BussinessHttpService, useValue: bussinessHttpServiceMock },
      ],
    });
    bussinessHttpServiceMock.deleteWorker.mockReturnValue(of({}))
    fixture = TestBed.createComponent(ParentComponentMock);
    hostComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(DeleteDirective));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should call BussinessHttpService.deleteWorker and emit workerDeleted event when worker is deleted', () => {
    // given
    const onWorkerDeletedSpy = jest.spyOn(hostComponent, 'onWorkerDeleted');

    // Act
    directiveElement.triggerEventHandler('click', null);

    // Assert
    expect(bussinessHttpServiceMock.deleteWorker).toHaveBeenCalled();
    expect(onWorkerDeletedSpy).toHaveBeenCalled();
  });
});