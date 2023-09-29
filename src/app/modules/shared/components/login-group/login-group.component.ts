import { Component, Input, inject } from '@angular/core';
import { ControlContainer, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';


@Component({
  selector: 'app-login-group',
  styleUrls: ['./login-group.component.scss'],
  imports: [ReactiveFormsModule, MaterialModule],
  standalone: true,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  template: `
    <fieldset [formGroupName]="controlKey">
      <legend>{{label}}</legend>
      <div>
      <mat-form-field appearance="outline">
        <input matInput placeholder="example@example.com" formControlName="email">
      </mat-form-field> 
      <mat-form-field appearance="outline">
        <input matInput [type]="showPassword ? 'text' : 'password'" placeholder="Password" formControlName="password">
        <button mat-icon-button matSuffix (click)="showPassword = !showPassword">
          <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>
      </mat-form-field>
      </div>
    </fieldset>
  `
})
export class LoginGroupComponent {
  @Input({required: true}) controlKey: string ='';
  @Input() label: string = '';
  protected showPassword: boolean = false;

  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }

  ngOnInit() {
    this.parentFormGroup.addControl(this.controlKey, 
      new FormGroup({
        email: new FormControl('',Validators.required),
        password: new FormControl('',Validators.required)
      }))
  }

  ngOnDestroy() {
    this.parentFormGroup.removeControl(this.controlKey);
  }

}



