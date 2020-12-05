import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
//import { AlertComponent } from './../utlis/alert/alert.component';
import { HeaderComponent } from './header/header.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { SidebarLeftComponent } from './sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './sidebar-right/sidebar-right.component';
import { FooterComponent } from './footer/footer.component'; 

@NgModule({
  declarations: [ HeaderComponent, NavHeaderComponent, SidebarLeftComponent, SidebarRightComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent, NavHeaderComponent, SidebarLeftComponent, SidebarRightComponent, FooterComponent],
})
export class SharedModule { }
