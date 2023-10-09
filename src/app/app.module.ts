import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STORAGE_SERVICE } from './tokens/storage.token';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/Auth/auth.module';
import { MaterialModule } from './modules/shared/material/material.module';
import { RequestHttpInterceptor } from './interceptors/request-http.interceptor';
import { SuccessRespondInterceptor } from './interceptors/success-respond.interceptor';
import { ErrorRespondInterceptor } from './interceptors/error-respond.interceptor';
import { DelayRespondInterceptor } from './interceptors/delay-respond.interceptor';
import { LocalStorageService } from './services/storage/localStrorageService.class';

@NgModule({
  declarations: [
    AppComponent,
    CustomSnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    MaterialModule
  ],
  providers: [
    {
      provide: STORAGE_SERVICE, // STORAGE_SERVICE
      useFactory: () => {
        return new LocalStorageService(window);
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SuccessRespondInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorRespondInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DelayRespondInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
