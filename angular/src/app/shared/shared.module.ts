import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {AlertComponent} from './../utlis/alert/alert.component';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingFooterComponent } from './landing-footer/landing-footer.component'; 

@NgModule({
  declarations: [LandingHeaderComponent,AlertComponent, LandingFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LandingHeaderComponent,AlertComponent, LandingFooterComponent],
})
export class SharedModule { }
