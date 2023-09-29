import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { UserDetails } from 'src/app/interfaces/user.inteface';
import { AuthService } from 'src/app/modules/Auth/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  sidenavMode: MatDrawerMode = 'side'; 
  isSidenavOpen = true;
  userDetails!: UserDetails;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar
    ){}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state) => {
        if (state.matches) {
          this.sidenavMode = 'over';
          this.isSidenavOpen = false;
          return;
        } 
        this.sidenavMode = 'side';
        this.isSidenavOpen = true;
      });
      this.userDetails = this.route.snapshot.data['user']
  }

  logOut() {
    this.authService.logOut();
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar, 'Correct logout!', 'Close')
  }





}
