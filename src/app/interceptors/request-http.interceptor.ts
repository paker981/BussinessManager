import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractStorageService } from '../interfaces/storage.interface';
import { LocalStorageService } from '../services/LocalStrorageService.class';
import { STORAGE_SERVICE } from '../tokens/storage.token';

@Injectable()
export class RequestHttpInterceptor implements HttpInterceptor {

  constructor(@Inject(STORAGE_SERVICE) private storageService: AbstractStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.storageService.getData('authToken');

    if (token) {
      const cloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(cloned);
    } else {

      return next.handle(request);
    }
  }
}
//commit