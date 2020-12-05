import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.css']
})
export class ModalPopupComponent implements OnInit {

  @Input('email') email;
  // tslint:disable-next-line:no-input-rename
  @Input('marginTop') marginTop;
  constructor() { }

  ngOnInit(): void {
    this.initModal();
  }

  hideModal() {
    document.getElementById('close-modal').click();
  }

  initModal() {
   // $('#myModal').modal('show');
  }

}
