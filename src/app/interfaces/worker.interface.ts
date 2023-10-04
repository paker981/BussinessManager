import { FormControl } from "@angular/forms";

export interface Worker {
    id: string,
    name: string,
    surname: string,
    companyId: string,
    university: string
}

export interface OrginalWorker {
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
    data: OrginalWorker[]
}

export type WorkerForm = {
    id: FormControl<string>;
    name: FormControl<string>;
    surname: FormControl<string>;
    university: FormControl<string>;
    companyId: FormControl<string>;
  }