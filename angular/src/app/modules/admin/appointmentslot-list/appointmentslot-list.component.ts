import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'; //ngTriggers

import { UserService } from './../../admin/core/_services';

@Component({
  selector: 'app-appointmentslot-list',
  templateUrl: './appointmentslot-list.component.html',
  styleUrls: ['./appointmentslot-list.component.css']
})
export class AppointmentslotListComponent implements OnInit {

  // users: Members[];
  usersAr: any = {};
  userData: any = {};
  appointmentDate;
  titleModal: string;
  getId: number;
  viewmore: any = {};
  paramsId: any;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();

  //use for [COLUMN FILTER SEARCH] - [REENDER]
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;



  constructor(private http: HttpClient,
      private router: Router,
      private userService: UserService) { }


  //BackEnd Call Api:----------------------------------------------
  getAllRestApiResponse() {
      this.userService.getAppointmentSlot().subscribe(data => {
         console.log('dataaa'+JSON.stringify(data));
         this.userData = data;
        //   this.userData = data[0]['slot'];
        //   this.appointmentDate = data[0]['appointmentDate'];
    
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
