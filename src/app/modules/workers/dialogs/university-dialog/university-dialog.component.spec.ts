import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UniversityDialogComponent } from './university-dialog.component';
import { UniversityHttpService } from '../../../../services/university/university-http.service';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { University } from 'src/app/interfaces/university.interface';
import { SearchPipe } from '../../pipes/search.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('UniversityDialogComponent', () => {

  const universityHttpServiceMock = {
    getUniversities: jest.fn()
  }

  const dialogRefMock = {
    close: jest.fn()
  }

  const universityMock = [{"name": "AGH University of Science and Technology", "alpha_two_code": "PL", "state-province": null, "web_pages": ["http://www.agh.edu.pl/"], "domains": ["agh.edu.pl"], "country": "Poland"}];

  let component: UniversityDialogComponent;
  let fixture: ComponentFixture<UniversityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UniversityDialogComponent,
        SearchPipe
      ],
      providers: [
        {
          provide: UniversityHttpService,
          useValue: universityHttpServiceMock
        },
        {
          provide: MatDialogRef<UniversityDialogComponent>,
          useValue: dialogRefMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    universityHttpServiceMock.getUniversities.mockReturnValue(of(universityMock))
    fixture = TestBed.createComponent(UniversityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load universities on component initialization', fakeAsync(() => {
    // Assert
    expect(component.universities).toEqual(universityMock);
  }));

  it('should close the dialog when form is submitted with valid data', fakeAsync(() => {
    // Arrange
    component.form.setValue('Selected University');

    // Act
    component.submitForm();
    // Assert
    expect(dialogRefMock.close).toHaveBeenCalledWith('Selected University');
  }));

  it('should mark form as touched when form is submitted with invalid data', fakeAsync(() => {
    // Act
    component.submitForm();

    // Assert
    expect(component.form.touched).toBe(true);
  }));

  it('should close the dialog when closeDialog method is called', fakeAsync(() => {
    // Act
    component.closeDialog();
    tick();

    // Assert
    expect(dialogRefMock.close).toHaveBeenCalled();
  }));
});
