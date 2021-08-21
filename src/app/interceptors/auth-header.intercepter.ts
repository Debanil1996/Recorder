import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log(req.url);
        const authToken="BQVP345FRTDF";
        const autReq=req.clone({
            setHeaders:{Authorization: authToken}
        })
        return next.handle(autReq);
    }
}