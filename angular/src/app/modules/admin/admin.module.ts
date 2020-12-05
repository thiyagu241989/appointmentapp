import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//npm custom-package -------------------------------
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';        			    //[Bootstrap-ui]
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar'; 			      //[Loading-Bar]
import { MaterialModule } from './core/_material/material.module';      //[core-material]
import { SimpleModalModule } from 'ngx-simple-modal';    			          //[modal]
import { DataTablesModule } from 'angular-datatables';                    //-->DataTable
import { ToastrModule } from 'ngx-toastr';                               // msg notification 
import { ToastrService } from 'ngx-toastr';
import { UiSwitchModule } from 'ngx-ui-switch';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
//Root ----------------------------------------------
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

//Layout --------------------------------------------
import { SharedModule } from './shared/shared.module';

import { AlertComponent } from './utlis/alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { SlotCreateComponent } from './slot-create/slot-create.component';
import { AppointmentslotListComponent } from './appointmentslot-list/appointmentslot-list.component';




@NgModule({
  declarations: [
    AdminComponent, 
    DashboardComponent, 
    AlertComponent, AppointmentListComponent, SlotCreateComponent, AppointmentslotListComponent 
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SlimLoadingBarModule,
    NgbModule,
    SharedModule,
    MaterialModule,
    SimpleModalModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ToastrModule.forRoot(),
    DataTablesModule,
    UiSwitchModule,
    AdminRoutingModule
  ],
  providers: [ToastrService]
})
export class AdminModule { }
