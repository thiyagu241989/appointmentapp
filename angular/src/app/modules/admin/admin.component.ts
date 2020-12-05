import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

//declare var jQuery:any;
declare var $: any;
declare const document: Document;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'angular';

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public loadScript() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "assets/js/adminlte.js";
    document.getElementsByTagName('head')[0].appendChild(script);

  }

  ngOnInit() {
    this.loadScript();
    this.document.body.className = "sidebar-mini control-sidebar-slide-open text-sm";
  }

}
