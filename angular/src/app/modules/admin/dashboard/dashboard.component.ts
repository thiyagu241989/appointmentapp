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

  dashboardInfo: any = {};
  walletInfo: any = {};
  currentMonthInfo: any = {};
  lastMonthInfo: any = {};
  currentWeekInfo: any = {};
  lastWeekInfo: any = {};

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
    this.userService.getDashboardDetails().subscribe((data: any) => {
      this.dashboardInfo = data;
    //  console.log('dash info'+JSON.stringify(this.dashboardInfo));
      this.walletInfo = data['walletBalances'];
      this.currentMonthInfo = data['currentMonth'];
      this.lastMonthInfo = data['lastMonth'];
      this.currentWeekInfo = data['currentWeek'];
      this.lastWeekInfo = data['lastWeek'];
      
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}
