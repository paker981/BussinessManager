import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map, tap } from 'rxjs';
import { Company } from 'src/app/interfaces/company.interface';

@UntilDestroy()
@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent {

  company$: Observable<Company>= this.route.data.pipe(
    map((val)=>val['company']),
    tap(()=> this.listShowed = false)
  )

  listShowed: boolean = false;

  constructor(
    private route: ActivatedRoute
    ) {}

  listShow(){
   this.listShowed = !this.listShowed;
  }  
}
