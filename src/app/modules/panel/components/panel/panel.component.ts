import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { CustomSnackBarComponent } from '../../../../components/custom-snack-bar/custom-snack-bar.component';
import { Country } from '../../../../interfaces/country.interface';
import { UserDetails } from '../../../../interfaces/user.inteface';
import { AuthService } from '../../../../modules/Auth/services/auth.service';
import { StateService } from '../../../../services/stateManagment/state.service';

@UntilDestroy()
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @ViewChild('sidenavRef') sidenav!: MatSidenav;

  sidenav$ = this.stateService.sidenavState$;

  countries = Country;
  userDetails!: UserDetails;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private stateService: StateService
    ){
      this.userDetails = this.route.snapshot.data['user']
    }

  onUpdateSidenavState(){
    this.stateService.setSidenavState('side', !this.sidenav.opened)
  }

  logOut() {
    this.authService.logOut();
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar, 'Correct logout!', 'Close')
  }

  onChangeCountry(value: Country){
    this.stateService.updateCountryState(value);
    CustomSnackBarComponent.openSuccessSnackBar(this.snackBar, `Country switched to ${value}`, 'Close!');
  }






}
