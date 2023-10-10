import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../../../modules/Auth/services/auth.service';
import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';
import { StateService } from '../../../../services/stateManagment/state.service';
import { Country } from '../../../../interfaces/country.interface';
import { MatSidenav } from '@angular/material/sidenav';

describe('PanelComponent', () => {

  const authServiceMock = {
    logOut: jest.fn()
  }

  const stateServiceMock = {
    updateCountryState: jest.fn(),
    setSidenavState: jest.fn()
  }

  const snackBarMock = {
    openFromComponent: jest.fn()
  }

  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: { user: of({}) } }
          }
        },
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: MatSnackBar,
          useValue: snackBarMock
        },
        {
          provide: StateService,
          useValue: stateServiceMock
        }
      ]
    });
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logOut on service and open snackBar on logOut method', () => {
    // when
    component.logOut();

    // then
    expect(authServiceMock.logOut).toHaveBeenCalled();
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  });

  it('should call setSideState on service when sidenav state update', () => {
    // given
    component.sidenav = { opened: false } as MatSidenav;
    
    // when
    component.onUpdateSidenavState();

    // then
    expect(stateServiceMock.setSidenavState).toHaveBeenCalled();
  });

  it('should call updateCountryState on service when country change', () => {
    // given
    const selectedCountry = Country.US;

    // when
    component.onChangeCountry(selectedCountry);

    // then
    expect(stateServiceMock.updateCountryState).toHaveBeenCalledWith(selectedCountry);
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
  });
});
