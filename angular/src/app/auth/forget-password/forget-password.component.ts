import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './../../core/_helpers/must-match.validator';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AlertService, AuthenticationService } from './../../core/_services';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;
  forgetFormEnableStatus: boolean = false;
  loading = false;
  submitted = false;
  //data = [];
  forgetResetForm: FormGroup;
  forgetResetFormEnableStatus: boolean = true;

  seQuestionList : any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private _loadingBar: SlimLoadingBarService,
    private alertService: AlertService
  ) {

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

   // this.createForgetPaswdForm();
    this.createForgetResetPaswdForm();

  }

  // createForgetPaswdForm() {
  //   this.forgetForm = this.fb.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     securityQuestion: ['', Validators.required],
  //     securityAnswer: ['', Validators.required]
  //   });
  // }

  // convenience getter for easy access to form fields
  // get f() {
  //   return this.forgetForm.controls;
  // }

  createForgetResetPaswdForm() {
    this.forgetResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // newPassword: ['', [Validators.required, Validators.minLength(6)]],
      // confirmPassword: ['', Validators.required],
      otp: ['', Validators.required]
    });
  }

  get s() {
    return this.forgetResetForm.controls;
  }

  onSubmitForgetForm() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgetForm.invalid) {
      return;
    }

    this._loadingBar.start();
    this.loading = true;
    console.log('forget form value'+ JSON.stringify(this.forgetForm.value));
    this.authenticationService.forgetPassword(this.forgetForm.value).pipe(first()).subscribe(data => {
      this.alertService.success('OTP send Mail', true);
      this._loadingBar.complete();
      this.forgetFormEnableStatus = false;
      this.forgetResetFormEnableStatus = true;
      //this.router.navigate(['/login']);
    },
      error => {
        this.alertService.error(error);
        this._loadingBar.stop();
        this.loading = false;
      });
  }


  onSubmitForgetRestForm() {
    console.log('click');
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgetResetForm.invalid) {
      return;
    }

    this._loadingBar.start();
    this.loading = true;
    console.log('forget reset form value'+ JSON.stringify(this.forgetResetForm.value));
    this.authenticationService.forgetPasswordReset(this.forgetResetForm.value).pipe(first()).subscribe(data => {
      this.alertService.success('Password Change Successfully', true);
      this._loadingBar.complete();
      this.forgetFormEnableStatus = true;
      this.forgetResetFormEnableStatus = false;
      this.router.navigate(['/login']);
    },
      error => {
        this.alertService.error(error);
        this._loadingBar.stop();
        this.loading = false;
      });
  }


//   getSecurityQuestion() {
//     console.log(this.f.questionGroup);
//     const obj = {
//         email: this.f.email.value,
//     };
//     this.authenticationService.getSecurityQuestion(obj).subscribe((data: any) => {
//         console.log(data);
//         if (data.status === 'success') {
//             this.seQuestionList = data['contacts'];
//         }
//     });
// }

  ngOnInit(): void {
  }

}
