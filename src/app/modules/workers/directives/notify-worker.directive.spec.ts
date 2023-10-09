import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Worker } from "src/app/interfaces/worker.interface";
import { NotifyWorkerDirective } from "./notify-worker.directive";
import { MatDialog } from "@angular/material/dialog";
import { BussinessHttpService } from "../../../services/bussiness/bussiness-http.service";
import { WorkerService } from "../services/worker.service";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";
import { UniversityDialogComponent } from "../dialogs/university-dialog/university-dialog.component";



describe('NotifyWorkerDirective', () => {
    @Component({
      template: '<button appNotifyWorker [data]="worker">Notify Worker</button>',
    })
    class ParentComponentMock {
      worker = workerMock;
    }

    const workerMock: Worker = {
        id: '1',
        name: 'John',
        surname: 'Doe',
        companyId: '1',
        university: 'University 1',
      }
    
    const dialogMock = {
        open: jest.fn()
    };

    const bussinessHttpServiceMock = {
        updateWorker: jest.fn(),
        notifyWorker: jest.fn()
    };

    const workerServiceMock = {
        updateWorkerList: jest.fn()
    }

    const clearMockUps = () => {
        bussinessHttpServiceMock.updateWorker.mockClear();
        bussinessHttpServiceMock.notifyWorker.mockClear();
        workerServiceMock.updateWorkerList.mockClear();
        dialogMock.open.mockClear();
    }
    
    let fixture: ComponentFixture<ParentComponentMock>;
    let hostComponent: ParentComponentMock;
    let directiveElement: DebugElement;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NotifyWorkerDirective, ParentComponentMock],
        providers: [
          { provide: MatDialog, useValue: dialogMock },
          { provide: BussinessHttpService, useValue: bussinessHttpServiceMock },
          { provide: WorkerService, useValue: workerServiceMock }
        ],
      });
  
      dialogMock.open.mockReturnValue({
        afterClosed: () => of(true),
       })
      workerServiceMock.updateWorkerList.mockReturnValue(of({}));
      bussinessHttpServiceMock.updateWorker.mockReturnValue(of({}));
  
      fixture = TestBed.createComponent(ParentComponentMock);
      hostComponent = fixture.componentInstance;
      directiveElement = fixture.debugElement.query(By.directive(NotifyWorkerDirective));
      fixture.detectChanges();
      clearMockUps();
    });
  
    it('should create', () => {
      expect(directiveElement).toBeTruthy();
    });
  
    it('should call notifyWorker when button is clicked and notifyWorker throws error', () => {
        //given 
        bussinessHttpServiceMock.notifyWorker.mockReturnValue(throwError(()=>of('Error')));

        // Act
        directiveElement.triggerEventHandler('click', null);

        // Assert
        expect(bussinessHttpServiceMock.notifyWorker).toHaveBeenCalledWith(workerMock.id);
        expect(dialogMock.open).toHaveBeenCalledWith(UniversityDialogComponent, {
            width: '450px',
            height: '300px',
          });
        expect(bussinessHttpServiceMock.updateWorker).toHaveBeenCalledWith(workerMock);
        expect(workerServiceMock.updateWorkerList).toHaveBeenCalledWith(workerMock.companyId);
    });

    it('should call notifyWorker when button is clicked and notifyWorker returns succeed', () => {
        //given 
        bussinessHttpServiceMock.notifyWorker.mockReturnValue(of({}));

        // Act
        directiveElement.triggerEventHandler('click', null);

        // Assert
        expect(bussinessHttpServiceMock.notifyWorker).toHaveBeenCalledWith(workerMock.id);
    });
  });


  