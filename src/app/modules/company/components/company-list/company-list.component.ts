import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Company, CompanyData } from 'src/app/interfaces/company.interface';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';

@Component({
  selector: 'app-company-list',
  template: `<a mat-list-item [routerLink]="['company', company._id]" *ngFor="let company of companies$ | async">{{company.name}}</a>`,
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {

  companies$: Observable<Company[]> = this.bussinessHttpService.getCompanies().pipe(
    map((val)=>val.data)
  );

  constructor(private bussinessHttpService: BussinessHttpService) {}
}
