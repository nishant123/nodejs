import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public toastrService: ToastrService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let reqClone;
        if (localStorage.getItem('access_token') != null) {
            reqClone = request.clone({ setHeaders: { 'x-access-token': localStorage.getItem('access_token') } });
        } else {
            reqClone = request.clone();
        }
        return next.handle(reqClone).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                this.router.navigate(['/']);
                this.toastrService.warning('Session expired !');
            } else if (error.status === 403) {
                this.router.navigate(['/']);
                this.toastrService.warning('Access Denied');
            }
            return throwError(error);
        })
        );
    }
}
