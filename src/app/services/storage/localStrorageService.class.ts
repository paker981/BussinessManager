import { Injectable } from "@angular/core";
import { AbstractStorageService } from "../../interfaces/storage.interface";

export class LocalStorageService implements AbstractStorageService {

    constructor(private readonly window: Window){}

    clear(): void {
        this.window.localStorage.clear();
    }
    
    getData(email: string): string { // token: string
        const token = this.window.localStorage.getItem(email);
        return token ? token : '';
    }
    saveData(email: string, token: string): void {// data:any, token: string
        this.window.localStorage.setItem(email, token);
    }

}