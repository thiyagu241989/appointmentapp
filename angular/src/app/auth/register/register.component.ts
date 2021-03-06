import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
// import custom validator to validate that password and confirm password fields match
import {MustMatch} from './../../core/_helpers/must-match.validator';

import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { AlertService, AuthenticationService } from './../../core/_services';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    //data = [];
	
	//oncheckBOx:
	enable2faStatus: boolean;
	// dropdownbox: 
	currentSelectedOption:string = "fsl";
	//eyeOption 
	fieldTextType: boolean;
	 
	closeResult: string;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private authenticationService: AuthenticationService,
		private _loadingBar: SlimLoadingBarService,
		private modalService: NgbModal,
        private alertService: AlertService
    ) {

        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }

    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            // organisation: ['', Validators.required],
            // phone: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
	    
		this._loadingBar.start();
        this.loading = true;
        this.authenticationService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.toastr.success('Registration successfully, Please login', 'Success');
					this._loadingBar.complete();
                    this.router.navigate(['/login']);
                },
                error => {
                    this.toastr.error(error);
                    // this.alertService.error(error);
					this._loadingBar.stop();
                    this.loading = false;
                });
    }
    
    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }
    

  
}
