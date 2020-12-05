import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


import { User } from './../../modules/admin/models';

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


    login2(email, password) {
        const Login= {
            email,
            password
        }
        return this.http
        .post(`${this.ENVIRONMENT_URL}/admin/auth/authentication`,Login)
            .pipe(map((data: any) => {
                if (data.status === 'success') {
                    localStorage.setItem('email', email);    
                }
                return data;
            }));
    }
	
	login(email: string, password: string) {
		//this.fakebackendUrl = 'http://localhost:4000'; 			//--> For Login Register purpose Only : [server demo]
		
        //*** this for fake authenticate [fake-backend :- declare in app.module] ------------------------------------
        // return this.http.post<any>(`${this.fakebackendUrl}/users/authenticate`, { email, password })
        //     .pipe(map(user => {
                 // login successful if there's a jwt token in the response    // JSON.stringify(user)
        //         if (user && user.authToken) {
		//			 this.isSocialLoggedSts = JSON.parse(localStorage.getItem('isSocialLoggedIn'));
                     // store user details and jwt token in local storage to keep user logged in between page refreshes
		//			 localStorage.setItem('userToken', user.authToken);
		//			 localStorage.setItem('userID', user.id);
		//			 localStorage.setItem('isSocialLoggedIn', this.isSocialLoggedSts);
		//			 localStorage.setItem('accountType', "COOKIE_ACCOUNT");
        //           localStorage.setItem('currentUser', JSON.stringify(user));
        //           this.currentUserSubject.next(user);
        //         }
		//		 console.log('login user'+JSON.stringify(user));
        //         return user;
        //     }));
		
        //[laravel login post - api]-------------------------------------------------------------------------------------------
        // return this.http.post<any>(`${this.uri}/login`, { email, password })
        //     .pipe(map(user => {
        //
        //         if(user.status == 'success'){
        //             // login successful if there's a jwt token in the response
        //             if (user && user.data.authToken) {
		//				   this.isSocialLoggedSts = JSON.parse(localStorage.getItem('isSocialLoggedIn'));
        //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
        //                 localStorage.setItem('userToken', user.data.authToken);
		//				   localStorage.setItem('accountType', "MY_ACCOUNT");
		//				   localStorage.setItem('isSocialLoggedIn', this.isSocialLoggedSts);
        //                 localStorage.setItem('currentUser', JSON.stringify(user.data.user));
		//                 localStorage.setItem('userID', JSON.stringify(user.data.user.id));
        //                 this.currentUserSubject.next(user.data.user);
        //             }
        //         }
        //         return user;
        //     }));
		
		//[nodejs login post - api]---------------------------------------------------------------------------------------------
        return this.http.post<any>(`api/auth/login`, { email, password })
            .pipe(map(user => {

               if(user.status == 'success'){
                    //console.log('authenticate success');
                    // login successful if there's a jwt token in the response
                    if (user && user.authToken) {
						  this.isSocialLoggedSts = JSON.parse(localStorage.getItem('isSocialLoggedIn'));
                        // store user details and jwt token in local storage to keep user logged in between page refreshes			
                          localStorage.setItem('userToken', user.authToken);
						  localStorage.setItem('accountType', "MY_ACCOUNT");
						  localStorage.setItem('isSocialLoggedIn', this.isSocialLoggedSts);
                          localStorage.setItem('currentUser', JSON.stringify(user.data));
						  localStorage.setItem('userID', user.data._id);
                          this.currentUserSubject.next(user.data);
                    }
                }
				//console.log('login user'+JSON.stringify(user));
                return user;
            }));
       
    }


    register(data) { //user: User
        return this.http.post(`${this.ENVIRONMENT_URL}/auth/register`, data);
    }


    // Libraries function for Authorization and authentication --------------------------------------------
    verifyOTP(obj) {
        return this.http.post(`${this.ENVIRONMENT_URL}/admin/verifyOtp`, obj).pipe(
          map((data: any) => {
          //  console.log(data);
            if (data.status === 'success') {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', data.token);
           //   console.log(localStorage.getItem('token'));
              localStorage.setItem('currentUser', data.user);
              localStorage.setItem('email', data.user.email);
              this.currentUserSubject.next(data);
            }
            return data;
          })
        );
      }



    forgetPassword(data) {
        return this.http.post(`api/users/forgetPassword`, data);
    }

    forgetPasswordReset(data) {
        return this.http.post(`api/users/forgetPassword_reset`, data);
    }

    getSecurityQuestion(data) {
        return this.http.post(`api/users/getSecurityQuestion`, data);
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