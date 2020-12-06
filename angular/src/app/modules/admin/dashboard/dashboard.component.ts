import { Component, OnDestroy, TemplateRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/_services';
import { UserService } from './../core/_services';
import { User } from './../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  status: boolean = false;

  userEmail;
  userName;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
  this.userEmail = localStorage.getItem('userEmail');
  this.userName = localStorage.getItem('userName');
   
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}
