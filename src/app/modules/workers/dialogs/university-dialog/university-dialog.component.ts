import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { University } from 'src/app/interfaces/university.interface';
import { UniversityHttpService } from '../../../../services/university/university-http.service';

@Component({
  selector: 'app-university-dialog',
  templateUrl: './university-dialog.component.html',
  styleUrls: ['./university-dialog.component.scss']
})
export class UniversityDialogComponent {

  form: FormControl<string> = new FormControl('',Validators.required) as FormControl<string>;
  formFilter: FormControl<string> = new FormControl('') as FormControl<string>;
  universities: University[] = [];

  universities$: Observable<University[]> = 
    this.universityHttpService.getUniversities().pipe(
      tap((val)=>this.universities = val)
    );  

  constructor(
    private universityHttpService: UniversityHttpService,
    private dialogRef: MatDialogRef<UniversityDialogComponent>
    ){}  

  submitForm(): void {
    // guard
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    
    this.dialogRef.close(this.form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
