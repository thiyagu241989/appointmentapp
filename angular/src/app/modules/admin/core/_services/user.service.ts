import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { User } from './../../../admin/models';

@Injectable({ providedIn: 'root' })
export class UserService {

    ENVIRONMENT_URL = environment.apiUrl;
    headers: any;
    emails: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    getDashboardDetails() {
        return this.http.get(`${this.ENVIRONMENT_URL}/admin/dashboard`)
            .pipe(map((data: any) => {
                return data;
            }));

    }

    getAppointmentDetails() {
        return this.http.get(`api/appointmentlist/view`)
            .pipe(map((data: any) => {
                return data;
            }));

    }

    getAppointmentSlot() {
        return this.http.get(`api/appointmentslot`)
            .pipe(map((data: any) => {
                return data;
            }));

    }
    addAppointmentSlot(data) {
        // return this.http.post(`api/users/add`, user);      //nodejs
		return this.http.post(`api/appointmentslot/add`, data);
    }
	
	//node-server-api -------------------------------------------------------------
   
	 
     add(data) {
        // return this.http.post(`api/users/add`, user);      //nodejs
		return this.http.post(`api/users/add`, data);
    }

	getAll() {
	//  return this.http.get<User[]>(`api/users`);
	 
	 return this.http.get(`api/users`)
           .pipe(map((data: any) => {
               return data;
           }));
       
    }
	    
	edit(id: number) {
        return this.http.get(`api/users/edit/${id}`);
    }
	
    update(user: User) {
        // return this.http.post(`api/users/add`, data);
	    return this.http.post(`api/users/update/${user.id}`, user);
    }

    delete(id: string) {
        return this.http.get(`api/users/delete/${id}`);
    }

    getById(id: number) {  //use in angular-table views:
        return this.http.get(`api/users/edit/${id}`);
    }

    register(user: User) {
        return this.http.post(`api/auth/register`, user);      //nodejs
    }
	
	mailVerification(id: string) {
        return this.http.get(`api/auth/verify/${id}`);
    }
	
	socialRegister(user: User) {
        return this.http.post(`api/auth/socialAuthReg`, user);      //nodejs
    }
	
	addDeviceInfo(user: User, id: string) {
        return this.http.post(`api/users/addDeviceInfo`, {user, id});      //nodejs
    }
	
	
	
    //-----------------------------------------------------------------------------------

    headerAuthorization() {
        console.log('token H:' + localStorage.getItem('token'));
        return new HttpHeaders().set("Authorization", localStorage.getItem('token'));
        // return new HttpHeaders().set("Authorization", 'Bearer ' + localStorage.getItem('token'));
        //  console.log('check header'+JSON.stringify(headers_object));
    }
    
}