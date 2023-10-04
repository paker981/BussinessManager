import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map, tap } from 'rxjs';
import { Company } from 'src/app/interfaces/company.interface';
import { Worker } from 'src/app/interfaces/worker.interface';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';

@UntilDestroy()
@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {

  company$: Observable<Company>= this.route.data.pipe(
    map((val)=>val['company']),
    tap(()=> this.listShowed = false)
  )

  listShowed: boolean = false;

  constructor(
    private route: ActivatedRoute
    ) {}

  listShow(){
   this.listShowed=!this.listShowed;
  }  

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];

    // this.workers$ = this.bussinessHttpService.getWorkersFromCompany(id).pipe(
    //   map((val)=>val.data),
    //   )
  }

}
