import { Component, OnInit, ViewChild, ViewEncapsulation, ViewChildren } from '@angular/core';
import { CorporateActionModel } from '../models/corporateactions.model';
import { CorporateActionService } from '../services/corporateaction.service';
import { StaticDataService } from '../services/staticdata.service';

import { Animations } from '../shared/animations';
import { GridOptions } from 'ag-grid/main';

import { DatatableComponent } from '../shared/ui/datatable/datatable.component';

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

  selectedClientCode = "MLC";
  selectedType = 'current'

  constructor(private staticDataService: StaticDataService) {
  }

  @ViewChild(DatatableComponent) dt:DatatableComponent; 

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

  viewStatus(type:string) {
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
    console.log('this is exposed');
    console.log(data.ID);
  }

}





