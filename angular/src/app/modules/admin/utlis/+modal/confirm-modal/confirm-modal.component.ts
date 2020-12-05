import { Component, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface ConfirmModel {
  title: string;
  message: string;
  emailArr: Array<string>;
  confirmBox: boolean;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {

  title: string;
  message: string;
  emailArr: Array<string>;
  confirmBox: boolean;
  name: any ;
  constructor() {
	 super();
  }

  confirm() {
    // api calls:

    this.result = true;  //  return this.result = false (declined) true (isconfirmed)
    this.close();
  }
  
  ngOnInit(): void {
    this.name = 'free fire';
  }

}
