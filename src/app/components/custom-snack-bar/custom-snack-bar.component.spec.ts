import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSnackBarComponent } from './custom-snack-bar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CustomSnackBarComponent', () => {

  const snackBarMock = {
    openFromComponent: jest.fn()
  }

  const dismissSpy = jest.fn();
  let component: CustomSnackBarComponent;
  let fixture: ComponentFixture<CustomSnackBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CustomSnackBarComponent
      ],
      imports: [MatSnackBarModule, NoopAnimationsModule],
      providers: [
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            message: 'Test Message',
            action: 'Test Action',
            icon: 'test-icon',
            snackBar: {
                dismiss: dismissSpy, // Mock dismiss method
              } as unknown as MatSnackBarRef<CustomSnackBarComponent>,
            }, 
        },
        {
          provide: MatSnackBar,
          useValue: snackBarMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(CustomSnackBarComponent);
    component = fixture.componentInstance;
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the snackbar', () => {
    // when 
    component.closeSnackbar();

    // then
    expect(dismissSpy).toHaveBeenCalled();
  });

  it('should open an error snackbar', () => {
    // when 
    CustomSnackBarComponent.openErrorSnackBar(snackBarMock as unknown as MatSnackBar, 'Test Error', 'Close');

    // then
    expect(snackBarMock.openFromComponent).toHaveBeenCalledWith(CustomSnackBarComponent, {
      data: {
        message: 'Test Error',
        color: "#eb0808",
        action: 'Close',
        icon: 'report-problem',
        snackBar: snackBarMock,
      },
      panelClass: 'error-snackbar',
      duration: 5000,
    });
  });

  it('should open a success snackbar', () => {
    // when 
    CustomSnackBarComponent.openSuccessSnackBar(snackBarMock as unknown as MatSnackBar, 'Test Success', 'Close');

    // then
    expect(snackBarMock.openFromComponent).toHaveBeenCalledWith(CustomSnackBarComponent, {
      data: {
        message: 'Test Success',
        action: 'Close',
        color: '#0afd32f3',
        icon: 'done',
        snackBar: snackBarMock,
      },
      panelClass: 'success-snackbar',
      duration: 5000,
    });
  });
});
