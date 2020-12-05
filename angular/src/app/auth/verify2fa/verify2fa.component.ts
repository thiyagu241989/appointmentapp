import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {AlertService, AuthenticationService} from './../../core/_services';


@Component({
  selector: 'app-verify2fa',
  templateUrl: './verify2fa.component.html',
  styleUrls: ['./verify2fa.component.css']
})
export class Verify2faComponent implements OnInit {

  loginStatus = true;
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  loginErrorMessage = false;
  loginSuccessMessage = false;
  loginOTPSuccessMessage = false;
  loginOTPErrorMessage = false;
  otp;
  meteDetails;
  resendOtpSuccess = true;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: AuthenticationService
  ) {
    //console.log(this.apiService.currentUserValue);
    if (this.apiService.currentUserValue) {
      // this.router.navigate(['/pages/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginStatus = true;
  }


  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.loginErrorMessage = false;
    const isLoggedIn = true;
    this.router.navigate(['/pages/dashboard']);
  }

  verifyOTP() {
    this.loginOTPErrorMessage = false;
    const email = localStorage.getItem('email');
    const obj = {
      otp: this.otp,
      email: email,
    };

    this.apiService.verifyOTP(obj).subscribe((data: any) => {
    //  console.log(data);
      if (data.status === 'success') {
          this.loginOTPErrorMessage = false;
          this.resendOtpSuccess = false;
          this.loginOTPSuccessMessage = true;
          this.router.navigate(['/admin/home']);
      }
  },
  (err) => {
      this.loginOTPErrorMessage = true;
  });
  }


}
