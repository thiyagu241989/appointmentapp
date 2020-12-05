import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AuthenticationService } from './../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private apiService: AuthenticationService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const currentUser = this.apiService.currentUserValue;
        const isLoggedIn = currentUser && localStorage.getItem('token');
        //console.log('Intercept Token:'+isLoggedIn);
       // const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn) {
           // console.log('Intercept header IN');
            request = request.clone({
                setHeaders: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            });
        }
        return next.handle(request);
    }
    // constructor(private authenticationService: AuthenticationService) {}

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // add authorization header with jwt token if available [token field from backendApi]
    //     let currentUser = this.authenticationService.currentUserValue;
    //     console.log('jwt token:'+ currentUser.token);
    //     if (currentUser && currentUser.token) {
    //         request = request.clone({
    //             setHeaders: { 
    //                 Authorization: `${currentUser.token}`
    //             }
    //         });
    //     }

    //     return next.handle(request);
    // }
}