import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Company, CompanyData } from 'src/app/interfaces/company.interface';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';

export const companyResolver: ResolveFn<Company> = (route, state) => {

  const bussinessHttpService = inject(BussinessHttpService);

  return bussinessHttpService.getCompany(route.params['id']);
};
