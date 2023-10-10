import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGroupComponent } from './login-group.component';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../material/material.module';
import { Component, Directive, Input, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `<form [formGroup]="form">
              <app-login-group controlKey="testKey"/>
            </form>
            `
})
class ParentComponentMock {
  @ViewChild(LoginGroupComponent) loginGroupComponent!: LoginGroupComponent; 
  form: FormGroup = new FormGroup({});
}

describe('LoginGroupComponent', () => {
  //second option with provide controlcontainer
  //const parentFormMock = new FormGroup({});
  //const formGroupDirectiveMock: FormGroupDirective = new FormGroupDirective([], []);
  //formGroupDirectiveMock.form = parentFormMock;

  let component: ParentComponentMock;
  let fixture: ComponentFixture<ParentComponentMock>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentComponentMock],
      imports: [
        ReactiveFormsModule, 
        LoginGroupComponent, 
        NoopAnimationsModule
      ],
      providers: [
        // { 
        //   provide: ControlContainer,
        //   useValue: formGroupDirectiveMock
        // },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    //fixture = TestBed.createComponent(LoginGroupComponent);
    //component.controlKey = 'testKey';
    fixture = TestBed.createComponent(ParentComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add form controls to parent form group on initialization', () => {
    expect(component.form.get('testKey')).toBeInstanceOf(FormGroup);
    expect(component.form.get('testKey')?.get('email')).toBeInstanceOf(FormControl);
    expect(component.form.get('testKey')?.get('password')).toBeInstanceOf(FormControl);
  });

  it('should remove form controls from parent form group on destruction', () => {
    component.loginGroupComponent.ngOnDestroy();
    expect(component.form.get('testKey')).toBeNull();
  });
});
