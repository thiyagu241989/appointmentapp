import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/_services';
import { UserService } from './../core/_services';
import { User } from './../models';

@Component({
  selector: 'app-slot-create',
  templateUrl: './slot-create.component.html',
  styleUrls: ['./slot-create.component.css']
})
export class SlotCreateComponent implements OnInit {

  mrngSlotStartTime = '09:00 am';
  mrngSlotEndTime = '12:00 pm';

  evngSlotStartTime = '05:00 pm';
  evngSlotEndTime = '09:00 pm';
  // MORING:
  // finalmorngTimeSlot = ["09:00 am"];
  finalmorngTimeSlot: any = [];
  morngStartTimeVal;

  //EVENING:
  finalEvngTimeSlot: any = [];
  evngStartTimeVal;

  appointmentDateVal;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService) { }



  onAddMorningSlot(mrngStartTime) {
    if (mrngStartTime.value) {
      this.morngStartTimeVal = this.convertFrom24To12Format(mrngStartTime.value);
      //check validation slots exists or not**:
      let AvailabilityStatus = this.CheckTimeMrngSlotExistsOrNot(this.morngStartTimeVal);
      console.log('FinalTimeStatus' + AvailabilityStatus);
      // final submition notification**
      if (AvailabilityStatus) {
        mrngStartTime.value = '';
        this.toastr.success('Morning time slot added successfully', 'Success');
      } else {
        this.toastr.error('Time slot Already Exists');
      }
    } else {
      this.toastr.error('Time slot is required');
    }
  }

  CheckTimeMrngSlotExistsOrNot(morngStartTimeVal) {
    if (this.finalmorngTimeSlot && this.finalmorngTimeSlot.length > 0) {
      // for (var val of this.finalmorngTimeSlot) {

      var isPresent = this.finalmorngTimeSlot.some(function (val) { return val.startTime === morngStartTimeVal });
      if (isPresent) {
        console.log('exists');
        return false;
      } else {
        const mrngSlotTimeObj = {
          slotType: '1',
          slotEvent: 'morning',
          startTime: morngStartTimeVal,
          slotInterval: '30 mins',
        }
        this.finalmorngTimeSlot.push(mrngSlotTimeObj);
        return true;
      }

    } else {

      const mrngSlotTimeObj = {
        slotType: '1',
        slotEvent: 'morning',
        startTime: morngStartTimeVal,
        slotInterval: '30 mins',
      }
      this.finalmorngTimeSlot.push(mrngSlotTimeObj);
      // console.log('New Array:' + JSON.stringify(this.finalmorngTimeSlot));
      return true;
    }

  }


  // FINALSUBMISSION OF MORING APPOINTMENT**
  onSubmitMoringAppointment(appointmentDate) {

    if (appointmentDate.value) {
      console.log(appointmentDate.value);
      this.appointmentDateVal = appointmentDate.value;

      if (this.finalmorngTimeSlot && this.finalmorngTimeSlot.length > 0) {

        const moringSlotObj = {
          appointmentDate: appointmentDate.value,
          slot: this.finalmorngTimeSlot
        }
        console.log('final submission of moring appointment' + JSON.stringify(moringSlotObj));
        this.userService.addAppointmentSlot(moringSlotObj).subscribe((data: any) => {
          console.log(data);
          if(data['status'] == 'success'){
          this.toastr.success('Appointment slot Updated', 'Success');
          this.router.navigate(['/admin/appointmentslot-list']);
          }
        });


      } else {
        this.toastr.error('Morning slot is required');
      }

    } else {
      console.log('null val');
      this.toastr.error('Appointment date is required');
    }

  }



  convertFrom24To12Format(time: any) {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour >= 12 ? 'pm' : 'am';
    min = (min + '').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + '').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }

  //---------------------------------------------------------------------------------------
  //EVENING SLOT:
  onAddEveningSlot(evngStartTime) {
    if (evngStartTime.value) {
      this.evngStartTimeVal = this.convertFrom24To12Format(evngStartTime.value);
      //check validation slots exists or not**:
      let AvailabilityStatus = this.CheckTimeEvingSlotExistsOrNot(this.evngStartTimeVal);
      console.log('FinalTimeStatus' + AvailabilityStatus);
      // final submition notification**
      if (AvailabilityStatus) {
        evngStartTime.value = '';
        this.toastr.success('Evening timeslot added successfully', 'Success');
      } else {
        this.toastr.error('Time slot Already Exists');
      }
    } else {
      this.toastr.error('Time slot Required');
    }
  }

  CheckTimeEvingSlotExistsOrNot(evngStartTimeVal) {
    if (this.finalEvngTimeSlot && this.finalEvngTimeSlot.length > 0) {
      var isPresent = this.finalEvngTimeSlot.some(function (val) { return val.startTime === evngStartTimeVal });
      if (isPresent) {
        return false;
      } else {
        const evngSlotTimeObj = {
          slotType: '2',
          slotEvent: 'evening',
          startTime: evngStartTimeVal,
          slotInterval: '30 mins',
        }

        this.finalEvngTimeSlot.push(evngSlotTimeObj);
        return true;
      }

    } else {
      const evngSlotTimeObj = {
        slotType: '2',
        slotEvent: 'evening',
        startTime: evngStartTimeVal,
        slotInterval: '30 mins',
      }
      this.finalEvngTimeSlot.push(evngSlotTimeObj);
      return true;
    }

  }

  // FINALSUBMISSION OF EVENING APPOINTMENT**
  onSubmitEveningAppointment(appointmentDate) {
    if (appointmentDate.value) {
      console.log(appointmentDate.value);
      this.appointmentDateVal = appointmentDate.value;

      if (this.finalEvngTimeSlot && this.finalEvngTimeSlot.length > 0) {

        const evngSlotObj = {
          appointmentDate: appointmentDate.value,
          slot: this.finalEvngTimeSlot
        }
        console.log('final submission of Evening appointment' + JSON.stringify(evngSlotObj));

        this.userService.addAppointmentSlot(evngSlotObj).subscribe((data: any) => {
          console.log(data);
          if(data['status'] == 'success'){
          this.toastr.success('Appointment slot Updated', 'Success');
          this.router.navigate(['/admin/appointmentslot-list']);
          }
        });


      } else {
        this.toastr.error('Evening slot is required');
      }

    } else {
      console.log('null val');
      this.toastr.error('Appointment date is required');
    }
  }

  ngOnInit() {
  }

}
