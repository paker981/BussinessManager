import { Inject, inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';

export const workersListResolver: ResolveFn<boolean> = (route, state) => {
  const bussinessHttpService = inject(BussinessHttpService);
  const id = route.parent?.data['company'].data['_id'];

  return bussinessHttpService.getWorkersFromCompany(id);
};
