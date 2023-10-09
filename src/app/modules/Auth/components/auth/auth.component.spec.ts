import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { FormControl, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthComponent', () => {


  class AuthComponentMock extends AuthComponent {
    setFormValue(controlKey: string,value: {email: string, password: string}){
      this.form.addControl(controlKey, 
        new FormGroup({
          email: new FormControl(value.email),
          password: new FormControl(value.password)
        }))
    }
  }


  const authServiceMock = {
    login: jest.fn(),
    register: jest.fn()
  }

  const routerMock = {
    navigate: jest.fn()
  }

  let component: AuthComponentMock;
  let fixture: ComponentFixture<AuthComponentMock>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        AuthComponentMock
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: Router,
          useValue: routerMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]

    });
    fixture = TestBed.createComponent(AuthComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user', () => {
    //given
    const userMock = { email: 'example@example.com', password: '123' };
    component.setFormValue("loginData",userMock);
    authServiceMock.login.mockReturnValue(of({}));

    //when
    component.login();

    //then
    expect(routerMock.navigate).toHaveBeenCalledWith(['/panel'])
  });


  it('should register user', () => {
    //given
    const userMock = { email: 'example@example.com', password: '123' };
    component.setFormValue("registerData",userMock);
    authServiceMock.register.mockReturnValue(of({}));
    const changeStateSpy = jest.spyOn(component,'changeState');

    //when
    component.register();

    //then
    expect(changeStateSpy).toHaveBeenCalledWith(true);
  });
});
