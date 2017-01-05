import { Component, OnInit, ViewChild, ViewEncapsulation, ViewChildren } from '@angular/core';
import { CorporateActionModel } from '../models/corporateactions.model';
import { CorporateActionService } from '../services/corporateaction.service';
import { StaticDataService } from '../services/staticdata.service';

import { Animations } from '../shared/animations';
import { GridOptions } from 'ag-grid/main';

import { DatatableComponent } from '../shared/ui/datatable/datatable.component';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'corp-action-list',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-list.component.html',
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page
})
export class CorpActionListComponent {

  clientCodes = [];
  comments = [];

  selectedClientCode = "MLC";
  selectedType = 'current'

  currentResponseID = 0;
  newNote = "";

  constructor(private staticDataService: StaticDataService, private corporateActionService: CorporateActionService) {
  }

  @ViewChild(DatatableComponent) dt: DatatableComponent;
  @ViewChild('modal') modal: ModalComponent;

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
      {
        "class": 'details-control',
        "orderable": false,
        "data": null,
        "defaultContent": ''
      },
      { "data": "EventType" },
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
        '<button class="btn-view" type="button">View</button>'
        //`<button type="button" saJquiDialogLauncher="#dialog-detail" class="btn btn-info">View</button>`
      }
    ],
    "order": [[1, 'asc']]
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
    this.corporateActionService.getCorpActionComments(data.ResponseID).subscribe(x => this.comments = x);
    this.modal.open();
  }

  closed() {
  }

  dismissed() {
  }

  opened() {
    this.newNote = "";
  }

  public addNote() {
    this.corporateActionService.addCorpActionComments(this.currentResponseID, this.newNote)
      .subscribe(x => {
        this.comments.splice(0, 0, x);
        this.newNote = "";
      });
  }

}





