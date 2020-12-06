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


    getAppointmentDetails() {
        return this.http.get(`api/appointmentlist/view`)
            .pipe(map((data: any) => {
                return data;
            }));

    }

    getAppointmentSearchDetail(data) {
        return this.http.get(`api/appointmentlist/view?date=` + data)
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
        return this.http.post(`api/appointmentslot/add`, data);
    }

    //-----------------------------------------------------------------------------------

    headerAuthorization() {
        console.log('token H:' + localStorage.getItem('token'));
        return new HttpHeaders().set("Authorization", localStorage.getItem('token'));
    }

}