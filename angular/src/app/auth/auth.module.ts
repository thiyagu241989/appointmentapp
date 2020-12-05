import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthAlertComponent } from './../utlis/auth-alert/auth-alert.component';
import { ModalPopupComponent } from './../utlis/modal-popup/modal-popup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ForgetPasswordResetComponent } from './forget-password-reset/forget-password-reset.component';
import { Verify2faComponent } from './verify2fa/verify2fa.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
  { path: 'forget-password', component: ForgetPasswordComponent, data: { title: 'Forget-Password' } },
  { path: 'forget-password-rest', component: ForgetPasswordResetComponent, data: { title: 'Forget-Password Reset' } },
  { path: 'verify2fa', component: Verify2faComponent, data: { title: 'verify2fa'}}
  
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthAlertComponent,
    ModalPopupComponent,
    AuthComponent,
    ForgetPasswordComponent,
    ForgetPasswordResetComponent,
    Verify2faComponent
  ],
  imports: [    
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule,AuthAlertComponent,Verify2faComponent ],
  providers: []  
})
export class AuthModule { }