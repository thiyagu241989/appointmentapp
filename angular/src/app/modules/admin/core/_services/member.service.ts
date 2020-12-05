import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  ENVIRONMENT_URL = environment.apiUrl;
  headers: any;
  emails: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //Memberlist
  getMemberList() {
    return this.http.get(
      `${this.ENVIRONMENT_URL}/admin/data/getMemberList`,
      {}
    );
  }

  getKycList() {
    return this.http.get(
      `${this.ENVIRONMENT_URL}/admin/data/getKycStatus`,
      {}
    );
  }

  //Getone transaction
}
