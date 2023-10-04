import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';
import { AuthService } from '../../services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  protected form: FormGroup = new FormGroup({});
  protected isRegister: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router 
    ){}

  login() {
    const value = this.form.controls["loginData"].value
    this.authService.login(value.email, value.password).pipe(
      untilDestroyed(this),
      tap(()=>this.router.navigate(['/panel']))
    ).subscribe();
    

  // TODO: poczytaj o long polling vs websockets
  }

  register() {
    const value = this.form.controls["registerData"].value;
    this.authService.register(value.email, value.password).pipe(
      untilDestroyed(this)
    ).subscribe()
    this.changeState(true);
  }

  changeState(value: boolean){
    this.isRegister = !value;
  }
}
