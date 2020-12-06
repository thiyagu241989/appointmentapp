import { Component, OnDestroy, TemplateRef, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/_services';
import { UserService } from './../../core/_services';
import { User } from './../../models';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.css']
})
export class SidebarLeftComponent implements OnInit, OnDestroy {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  status: boolean = false;
  usersInfo: any = {};
  userMail: any;

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnInit() {
    this.userMail = localStorage.getItem('userEmail');
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  logout(){
    this.authenticationService.logout();
    // window.location.reload();
    this.router.navigate(['/auth/login']);
  }

}
