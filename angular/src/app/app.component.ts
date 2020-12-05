import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
    NavigationCancel,
    Event,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from '@angular/router';  //:loading-bar

import { HttpClient } from '@angular/common/http';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

//declare var jQuery:any;
declare var $: any;
declare const document: Document;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(private http: HttpClient,
        private _loadingBar: SlimLoadingBarService,
        private router: Router) {

        this.router.events.subscribe((event: Event) => {
            this.navigationInterceptor(event);
        });
    }

    //:loading bar event occur:
    private navigationInterceptor(event: Event): void {
        if (event instanceof NavigationStart) {
            this._loadingBar.start();
        }
        if (event instanceof NavigationEnd) {
            this._loadingBar.complete();
        }
        if (event instanceof NavigationCancel) {
            this._loadingBar.stop();
        }
        if (event instanceof NavigationError) {
            this._loadingBar.stop();
        }
    }

    ngOnInit() {  
        this._loadingBar.start();
    }
}
