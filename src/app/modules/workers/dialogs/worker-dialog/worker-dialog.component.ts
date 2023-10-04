import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, filter, map, tap } from 'rxjs';
import { Company } from 'src/app/interfaces/company.interface';
import { University } from 'src/app/interfaces/university.interface';
import { Worker, WorkerForm } from 'src/app/interfaces/worker.interface';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';
import { UniversityHttpService } from 'src/app/services/university/university-http.service';

@Component({
  selector: 'app-worker-dialog',
  templateUrl: './worker-dialog.component.html',
  styleUrls: ['./worker-dialog.component.scss']
})
export class WorkerDialogComponent {

  form!: FormGroup<WorkerForm>;
  formFilter: FormControl<string> = new FormControl('') as FormControl<string>;

  universities$: Observable<University[]> = 
    this.universityHttpService.getUniversities().pipe(
      tap((val)=>this.universities = val),
    );
  companies$: Observable<Company[]> = this.bussinessHttpService.getCompanies();   

  universities: University[] = []
  isEdit: boolean = false;     

  constructor(
    private dialogRef: MatDialogRef<WorkerDialogComponent>,
    private universityHttpService: UniversityHttpService,
    private bussinessHttpService: BussinessHttpService,
    @Inject(MAT_DIALOG_DATA) protected data: Worker,
    ) { 
      this.isEdit = this.data ? true : false;

      this.form = new FormGroup<WorkerForm>({
        id: new FormControl(this.data ? this.data.id : '') as FormControl<string>,
        name: new FormControl(this.data ? this.data.name : '', Validators.required) as FormControl<string>,
        surname: new FormControl(this.data ? this.data.surname : '', Validators.required) as FormControl<string>,
        companyId: new FormControl(this.data ? this.data.companyId : '', Validators.required) as FormControl<string>,
        university: new FormControl(this.data ? this.data.university : '') as FormControl<string>
      })
    }

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
