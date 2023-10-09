import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { AbstractStorageService } from '../../../interfaces/storage.interface';
import { BussinessHttpService } from '../../../services/bussiness/bussiness-http.service';
import { STORAGE_SERVICE } from '../../../tokens/storage.token';

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

  logOut() {
    this.storageService.clear();
    this.router.navigate(['/auth']);
  }


}
