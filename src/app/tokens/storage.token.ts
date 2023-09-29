import { InjectionToken } from "@angular/core";
import { AbstractStorageService } from "../interfaces/storage.interface";

export const STORAGE_SERVICE = new InjectionToken<AbstractStorageService>('storage');