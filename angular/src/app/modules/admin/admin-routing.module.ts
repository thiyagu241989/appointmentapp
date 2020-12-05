import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../core/_guards';
import { AdminComponent } from './admin.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { SlotCreateComponent } from './slot-create/slot-create.component';
import { AppointmentslotListComponent } from './appointmentslot-list/appointmentslot-list.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children:
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: DashboardComponent }, 
        { path: 'appointment-list', component: AppointmentListComponent }, 
        { path: 'slot-create', component: SlotCreateComponent }, 
        { path: 'appointmentslot-list', component: AppointmentslotListComponent }, 
      ]
  },
  { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin/', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule{}