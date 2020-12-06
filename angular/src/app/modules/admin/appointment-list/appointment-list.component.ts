import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'; //ngTriggers
//date picker & time format:
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { UserService } from './../../admin/core/_services';


@Component({
    selector: 'app-appointment-list',
    templateUrl: './appointment-list.component.html',
    styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

    // users: Members[];
    usersAr: any = {};
    userData: any = {};

    titleModal: string;
    getId: number;
    viewmore: any = {};
    paramsId: any;
    appointmentCountData;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();

    //use for [COLUMN FILTER SEARCH] - [REENDER]
    @ViewChild(DataTableDirective, { static: false })
    datatableElement: DataTableDirective;



    constructor(private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private userService: UserService) { }


    //BackEnd Call Api:----------------------------------------------
    getAllRestApiResponse() {
        this.userService.getAppointmentDetails().subscribe(data => {
            console.log('trsnds:' + JSON.stringify(data));
            this.userData = data['data'];
            this.appointmentCountData = data['count'];
          
            /* Calling the DT trigger to manually render the table*/
            this.dtTrigger.next();

        });
    }
    //---------------------------------------------------------------
    //Click DB table getrow records refresh:
    rerender(): void {
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            //call the func db table recent rows: [NOTE]

            this.getAllRestApiResponse();
        });
    }

    //rowClickHandler: [ROW CLICK HANDLER]
    rowClickHandler(info: any): void {
        this.getId = info[0];
        this.titleModal = info[1];
        //RequestApi-Show
        this.viewRequestResponse(this.getId);
    }

    //modal Call:
    viewRequestResponse(id) {
        console.log(id);
        this.paramsId = id;
        //  const obj = { _id: id };
    }

    searchDataFilter(appointmentVal){
        this.userService.getAppointmentSearchDetail(appointmentVal).subscribe(data => {
            console.log('search:' + JSON.stringify(data));
            this.userData = data['data'];
            this.appointmentCountData = data['count'];
            /* Calling the DT trigger to manually render the table*/
             this.dtTrigger.next();

        });
    }
    onSearchAppointment(appointmentDate) {
        if (appointmentDate.value) {
            console.log('inputDate' + appointmentDate.value);
            let appointmentVal = appointmentDate.value;
            // this.userData= [];
            this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                // Destroy the table first
                dtInstance.destroy();
                //call the func db table recent rows: [NOTE]
    
                this.searchDataFilter(appointmentVal);
            });
           

        } else {
            console.log('null val');
            this.toastr.error('Appointment date is required');
        }

    }
    //------------------------------------------------------------------------------------------------------------------------------------------------
    // angular datatable[TBODY <TR>] - [EXPORT ALL]dTrigger - [REENDER] - [COLUMN FILTER SEARCH] -[ROW CLICK HANDLER] - [SELECTIVE] -[RESPONSIVE]
    //-----------------------------------------------------------------------------------------------------------------------------------------------
    ngOnInit(): void {

        $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
            return true;
        });


        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,       //[RESPONSIVE]
            select: false,           //[SELECTIVE]
            dom: 'Bfrtip',
            rowCallback: (row: Node, data: any[] | Object, index: number) => {     //[ROW CLICK HANDLER]
                const self = this;
                // Unbind first in order to avoid any duplicate handler
                $('td', row).unbind('click');
                $('td', row).bind('click', () => {
                    self.rowClickHandler(data);
                });
                return row;
            }
        };

        this.getAllRestApiResponse();

    }

    //<dTrigger>
    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
        $.fn['dataTable'].ext.search.pop();
    }

    //Column indiuval filtering:[COLUMN FILTER SEARCH]
    ngAfterViewInit(): void {
        this.dtTrigger.subscribe(() => {     // Error: <-- 'cannot read property 'then' of undefined use [dT.subcribe()]
            this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.columns().every(function () {
                    const that = this;
                    $('input', this.footer()).on('keyup change', function () {
                        if (that.search() !== this['value']) {
                            that
                                .search(this['value'])
                                .draw();
                        }
                    });
                });
            });
        });

    }

}
