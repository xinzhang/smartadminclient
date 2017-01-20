import { Component, OnInit, ViewChild, ViewEncapsulation, ViewChildren } from '@angular/core';
import { CorporateActionModel } from '../models/corporateactions.model';
import { CorporateActionService } from '../services/corporateaction.service';
import { StaticDataService } from '../services/staticdata.service';

import { Animations } from '../shared/animations';
import { GridOptions } from 'ag-grid/main';

import { DatatableComponent } from '../shared/ui/datatable/datatable.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'corp-action-list',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-list.component.html',
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class CorpActionListComponent {

  @ViewChild('summernote') summernote: any;

  clientCodes = [];
  comments = [];
  documents = [];

  selectedClientCode = "MLC";
  selectedType = 'current'

  currentResponseID = 0;
  
  status = ["Open", "Pend", "Respond", "Closed - No Action", "Closed - Action"]
  selectedStatus = "";
  selectedStatusComment = "";
  selectedFollowupDate = "";
  selectedFollowupComment = "";

  selectedAPIRCodes = [];
  selectedAPIRLabels = [];

  quickNote:string = "";

  constructor(private staticDataService: StaticDataService, private corporateActionService: CorporateActionService, private router: Router) {
  }

  @ViewChild(DatatableComponent) dt: DatatableComponent;
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('newNote') newNote; 

  ngOnInit() {
    this.staticDataService.getPortalClient()
      .subscribe(
      values => {
        this.clientCodes = values;
      },
      error => console.log(error)
      )
  }

  setClientCode($event: any) {
    this.selectedClientCode = $event.target.value;
    this.dt.refreshData('api/corporateactionresponse/' + this.selectedClientCode + "/" + this.selectedType);
  }

  viewStatus(type: string) {
    this.selectedType = type;
    this.dt.refreshData('api/corporateactionresponse/' + this.selectedClientCode + '/' + this.selectedType);
  }

  public options = {
    "ajax": {
      "url": 'api/corporateactionresponse/' + this.selectedClientCode + '/' + this.selectedType,
      "dataSrc": ''
    },
    "iDisplayLength": 5,
    "columns": [
      // {
      //   "class": 'details-control',
      //   "orderable": false,
      //   "data": null,
      //   "defaultContent": ''
      // },
      { "data": "EventType" },
      { "data": "DateTimeAdded"},
      { "data": "DueDate" },
      { "data": "Reference" },
      { "data": "Subject" },
      { "data": "IssuerCode" },
      { "data": "ClientCode" },
      { "data": "Status" },
      { "data": "FollowupDate" },      
      {
        "targets": -1,
        "data": null,
        "defaultContent":
        '<button class="btn btn-default btn-spacing btn-view" type="button">View</button><button class="btn btn-default btn-spacing btn-edit" type="button">Edit</button><button class="btn btn-default btn-spacing btn-other1" type="button">Email</button>'
      }
    ],
    "order": [[1, 'desc']]
  }

  public detailsFormat(d) {

    let detailsResponse = function (d) {
      let result: string = `<table>
                            <tr><th>Client Code</th><th>Status</th><th>Followup Date</th></tr>`;

      for (let action of d.ClientResponseActions) {
        result += `<tr>
                              <td>${action.ClientCode}</td>
                              <td>${action.Status}</td>
                              <td>${action.FollowupDate}</td>
                            </tr>`
      }
      result += "</table>";
      return result;
    }

    let detailsAPIR = function (d) {
      var result: string = "<ul>";
      for (let apir of d.APIRCodes) {
        result += `<li>${apir}</li>`
      }
      result += "</ul>";
      return result;
    }

    return `<table cell-padding="5" cell-spacing="0" border="0" class="table table-hover table-condensed">
            <tbody>              
            <tr>
                <td>APIR:</td>
                <td>`
      + detailsAPIR(d) + `
                </td>
            </tr>
            </tbody>
        </table>`
  }

  public onBtnViewClicked(data) {
    this.currentResponseID = data.ResponseID;
    this.selectedStatus = data.Status;
    this.selectedFollowupDate = data.FollowupDate;

    this.selectedAPIRCodes = data.APIRCodes;
    this.selectedAPIRLabels = data.APIRLabels;

    this.corporateActionService.getCorpActionComments(data.ResponseID).subscribe(x => this.comments = x);
    this.corporateActionService.getCorpActionDocuments(data.Reference).subscribe(x => this.documents = x);

    //add special code for the summernote assignment
    //$(this.summernote.nativeElement).summernote('editor.pasteHTML', data.Description);

    this.modal.open();
  }

  public onBtnEditClicked(data) {
    console.log(data.Reference);
    //<a [routerLink]="['/corporateaction/add-offline', c.Reference]" class="">Continue</a>
    this.router.navigateByUrl('/corporateaction/edit/' + data.Reference);
  }

  public onBtnEmailClicked(data) {
    console.log(data.Reference);
    //<a [routerLink]="['/corporateaction/add-offline', c.Reference]" class="">Continue</a>
    this.router.navigateByUrl('/corporateaction/email/' + data.Reference);
  }

  closed() {
  }

  dismissed() {
  }

  opened() {    
  }

  addNote() {
    
    this.corporateActionService.addCorpActionComments(this.currentResponseID, this.quickNote)
      .subscribe(x => {
        this.comments.splice(0, 0, x);
        this.newNote.nativeElement.value = "";        
      });
    
  }

  onSubmit(f) {    
    this.corporateActionService.updateCorpActionStatus(this.currentResponseID, this.selectedStatus, this.selectedStatusComment)
      .subscribe(x => {
        this.comments.splice(0, 0, x);
        this.selectedStatusComment = "";

        this.modal.dismiss();
      });
  }

  onSubmitFollowup(f) {    
    this.corporateActionService.updateCorpActionFollowup(this.currentResponseID, this.selectedFollowupDate, this.selectedFollowupComment)
      .subscribe(x => {
        this.comments.splice(0, 0, x);
        this.selectedFollowupComment = "";

        this.modal.dismiss();
      });
  }

  getLinkFileName(link:string) : string{
    return link.substring(link.lastIndexOf('/')+1);
  }

  followupDateChanged($dateTime: string) {
    this.selectedFollowupDate = $dateTime;        
  }

}





