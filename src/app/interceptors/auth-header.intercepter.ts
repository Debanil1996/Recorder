import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {fromPromise} from "rxjs/internal/observable/fromPromise";
import {mergeMap} from  "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor(private _storage:StorageService){
    }
    getToken():Observable<any> {
        return fromPromise(this._storage.get("token"))    
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.getToken().pipe(mergeMap((token)=>{
            const authToken="Bearer "+token;
            const autReq=req.clone({
                setHeaders:{Authorization: authToken}
            })
            return next.handle(autReq);

        }))
    }
}