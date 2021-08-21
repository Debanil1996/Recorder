import { AuthHeaderInterceptor } from './auth-header.intercepter';
import { HTTP_INTERCEPTORS } from "@angular/common/http";


export const httpInterceptorProviders=[
    {provide: HTTP_INTERCEPTORS,useClass: AuthHeaderInterceptor, multi: true}
]