import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGroupComponent } from './login-group.component';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../material/material.module';
import { Component, Directive, Input } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginGroupComponent', () => {

  const parentFormMock = new FormGroup({});
  const formGroupDirectiveMock: FormGroupDirective = new FormGroupDirective([], []);
  formGroupDirectiveMock.form = parentFormMock;

  let component: LoginGroupComponent;
  let fixture: ComponentFixture<LoginGroupComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ReactiveFormsModule, MaterialModule,
      LoginGroupComponent, NoopAnimationsModule],
      providers: [
        { 
          provide: ControlContainer,
          useValue: formGroupDirectiveMock
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginGroupComponent);
    component = fixture.componentInstance;
    component.controlKey = 'testKey';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add form controls to parent form group on initialization', () => {
    console.log(component.parentFormGroup);

    expect(component.parentFormGroup.get('testKey')).toBeInstanceOf(FormGroup);
    expect(component.parentFormGroup.get('testKey')?.get('email')).toBeInstanceOf(FormControl);
    expect(component.parentFormGroup.get('testKey')?.get('password')).toBeInstanceOf(FormControl);
  });

  it('should remove form controls from parent form group on destruction', () => {
    component.ngOnDestroy();
    expect(component.parentFormGroup.get('testKey')).toBeNull();
  });
});
