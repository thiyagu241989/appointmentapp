import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';

//datepicker format:
//import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
//import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';

@NgModule({
    declarations: [],
    imports: [
       CommonModule,
        RouterModule,
        MatDatepickerModule,
        MatFormFieldModule,
		MatTabsModule,
        MatInputModule

    ],
    exports: [
        MatDatepickerModule,
        MatFormFieldModule,
		MatTabsModule,
        MatInputModule
    ],
    providers: [MatDatepickerModule],
})
export class MaterialModule {
}
