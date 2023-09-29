import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CompanyData } from 'src/app/interfaces/company.interface';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';

export const companyResolver: ResolveFn<CompanyData> = (route, state) => {

  const bussinessHttpService = inject(BussinessHttpService);

  return bussinessHttpService.getCompany(route.params['id'])
};
