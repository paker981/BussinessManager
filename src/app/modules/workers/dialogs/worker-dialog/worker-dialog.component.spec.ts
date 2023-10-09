import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDialogComponent } from './worker-dialog.component';
import { UniversityHttpService } from 'src/app/services/university/university-http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';
import { of } from 'rxjs';

describe('WorkerDialogComponent', () => {

  const universityHttpServiceMock = {
    getUniversities: jest.fn()
  }

  const bussinessHttpServiceMock = {
    getCompanies: jest.fn()
  }

  const dialogRefMock = {
    close: jest.fn()
  }

  const universityMock = [{"name": "AGH University of Science and Technology", "alpha_two_code": "PL", "state-province": null, "web_pages": ["http://www.agh.edu.pl/"], "domains": ["agh.edu.pl"], "country": "Poland"}];

  let component: WorkerDialogComponent;
  let fixture: ComponentFixture<WorkerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerDialogComponent],
      providers: [
        {
          provide: UniversityHttpService,
          useValue: universityHttpServiceMock
        },
        {
          provide: MatDialogRef<WorkerDialogComponent>,
          useValue: dialogRefMock
        },
        {
          provide: BussinessHttpService,
          useValue: bussinessHttpServiceMock
        },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ]
    });
    universityHttpServiceMock.getUniversities.mockReturnValue(of(universityMock));
    bussinessHttpServiceMock.getCompanies.mockReturnValue(of([]));
    fixture = TestBed.createComponent(WorkerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRefMock.close.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load universities and companies on component initialization', () => {
    expect(component.universities).toEqual(universityMock);
    expect(component.form).toBeTruthy(); 
  });

  it('should close the dialog when form is submitted with valid data', () => {
    // Arrange
    const workerMock = {
      id: '1',
      name: 'John',
      surname: 'Doe',
      companyId: '1',
      university: 'University 1',
    }
    component.form.setValue(workerMock);

    // Act
    component.submitForm();

    // Assert
    expect(dialogRefMock.close).toHaveBeenCalledWith(workerMock);
  });

  it('should mark form as touched and not close the dialog when form is submitted with invalid data', () => {
    // Act
    component.submitForm();

    // Assert
    expect(dialogRefMock.close).not.toHaveBeenCalled();
    expect(component.form.touched).toBe(true);
  });

  it('should close the dialog when closeDialog method is called', () => {
    // Act
    component.closeDialog();

    // Assert
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
