import { FormControl } from "@angular/forms";

export interface Worker {
    _id: string,
    name: string,
    surname: string,
    companyId: string,
    university: string
}

export interface WorkerBody {
    name: string,
    surname: string,
    companyId: string,
    university: string
}

export interface CompanyWorkers {
    message: string,
    data: Worker[]
}

export type WorkerForm = {
    _id: FormControl<string>;
    name: FormControl<string>;
    surname: FormControl<string>;
    university: FormControl<string>;
    companyId: FormControl<string>;
  }