import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    usrToken: string;
    isSocialLoggedSts: any;
    ENVIRONMENT_URL = environment.apiUrl;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(
            localStorage.getItem('currentUser')
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
      }


   
	
	login(email: string, password: string) {
		
        return this.http.post<any>(`api/auth/login`, { email, password })
            .pipe(map(user => {
               if(user.status == 'success'){
                    // login successful if there's a jwt token in the response
                    if (user && user.authToken) {
						  this.isSocialLoggedSts = JSON.parse(localStorage.getItem('isSocialLoggedIn'));
                        // store user details and jwt token in local storage to keep user logged in between page refreshes			
                          localStorage.setItem('userToken', user.authToken);
                          localStorage.setItem('userEmail', user.data.email);
                          localStorage.setItem('userName', user.data.name);
                          localStorage.setItem('currentUser', JSON.stringify(user.data));
                          this.currentUserSubject.next(user.data);
                    }
                }
                return user;
            }));
       
    }


    register(data) { //user: User
        return this.http.post(`api/auth/register`, data);
    }


    //--------------------------------------------------------------------------------------

    logout() {
        //fake-end authenticate logout:-------------
        localStorage.removeItem('userToken');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        //--------------------------------------------
    }
}