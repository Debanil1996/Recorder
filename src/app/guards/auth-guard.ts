import { StorageService } from './../services/storage.service';
import { Location, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../auth/authservice.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private _router:Router,
        private _authService: AuthserviceService,
        private _location:Location,
        private storage:StorageService
    ){

    }


    async canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
      return true;

    }
}
