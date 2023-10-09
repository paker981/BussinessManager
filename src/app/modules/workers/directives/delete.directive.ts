import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Input() data!: string; // workerId

  @Output() workerDeleted = new EventEmitter<void>();

  @HostListener('click') onClick() {
    this.bussinessHttpService.deleteWorker(this.data).pipe(
      tap(()=>this.workerDeleted.emit())
    ).subscribe();
  }

  constructor(private bussinessHttpService: BussinessHttpService) { }
}
