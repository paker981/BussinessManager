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
export class WorkerDialogComponent implements OnInit{

  form: FormGroup<WorkerForm>;
  formFilter: FormControl<string> = new FormControl('') as FormControl<string>;

  universities$: Observable<University[]> = 
    this.universityHttpService.getUniversities().pipe(
      tap((val)=>this.universities = val),
    );
  companies$: Observable<Company[]> = 
    this.bussinessHttpService.getCompanies().pipe(
      map((val)=>val.data) // val.data do zmapowania gdzieś wyżej
    );    

  universities: University[] = []
  isEdit: boolean = false;     

  constructor(
    private dialogRef: MatDialogRef<WorkerDialogComponent>,
    private universityHttpService: UniversityHttpService,
    private bussinessHttpService: BussinessHttpService,
    @Inject(MAT_DIALOG_DATA) protected data: Worker,
    ) {
    // @Inject() host etc.

      this.form = new FormGroup<WorkerForm>({
        _id: new FormControl('') as FormControl<string>,
        name: new FormControl('', Validators.required) as FormControl<string>,
        surname: new FormControl('', Validators.required) as FormControl<string>,
        companyId: new FormControl('', Validators.required) as FormControl<string>,
        university: new FormControl('') as FormControl<string>
      })
    }
  ngOnInit(): void {
    // this.form = new FormGroup<WorkerForm>({
    //   _id: new FormControl(this.data ? this.data._id : '') as FormControl<string>,
    //   name: new FormControl('', Validators.required) as FormControl<string>,
    //   surname: new FormControl('', Validators.required) as FormControl<string>,
    //   companyId: new FormControl('', Validators.required) as FormControl<string>,
    //   university: new FormControl('') as FormControl<string>
    // })
    if(this.data){
      this.form.controls._id.setValue(this.data._id)
      this.form.controls.name.setValue(this.data.name)
      this.form.controls.surname.setValue(this.data.surname)
      this.form.controls.university.setValue(this.data.university)
      this.form.controls.companyId.setValue(this.data.companyId)
      this.isEdit = true;
    }

  }

  submitForm(): void {
    // guard
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }



}
