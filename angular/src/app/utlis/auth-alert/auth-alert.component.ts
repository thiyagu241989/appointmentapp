import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from './../../core/_services';

@Component({
  selector: 'app-auth-alert',
  templateUrl: './auth-alert.component.html',
  styleUrls: ['./auth-alert.component.css']
})
export class AuthAlertComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
    message : any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message =>{
             this.message = message;
    });
  }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


}
