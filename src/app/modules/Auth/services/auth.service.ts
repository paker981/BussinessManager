import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { AbstractStorageService } from 'src/app/interfaces/storage.interface';
import { BussinessHttpService } from 'src/app/services/bussiness/bussiness-http.service';
import { STORAGE_SERVICE } from 'src/app/tokens/storage.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(STORAGE_SERVICE) private storageService: AbstractStorageService,
    private bussinessApi: BussinessHttpService,
    private router: Router

    ) { }

  login(email: string, password: string) {
    return this.bussinessApi.signIn({email: email, password: password}).pipe(
      tap((val)=>this.storageService.saveData('authToken',val.accessToken)),
    )
  }

  register(email: string, password: string) {
    return this.bussinessApi.signUp({email: email, password: password})
  }

  // isLoggedIn(){
  //   const token = this.storageService.getData('authToken');
  //   return token ? true : false;
  // }

  // getToken(){
  //   return this.storageService.getData('authToken');
  // }

  logOut() {
    this.storageService.clear();
    this.router.navigate(['/auth']);
  }


}