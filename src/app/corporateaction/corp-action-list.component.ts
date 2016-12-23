import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';
import {CorporateActionService} from '../services/corporateaction.service';

import {Animations} from '../shared/animations';
import {GridOptions} from 'ag-grid/main';

@Component({
  selector: 'corp-action-list',    
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-list.component.html',
  host: { '[@routeAnimation]': 'true' },  
  animations: Animations.page  
})
export class CorpActionListComponent{
    
    private gridOptions:GridOptions;
    private columnDefs:any[];
    private rowData: any[]

    constructor(private corporateActionService:CorporateActionService){
      this.gridOptions = <GridOptions>{};
      this.createRowData();
      this.createColumnDefs();
    }


    ngOnInit() {
        
    } 

    createRowData() {
      this.corporateActionService.listCorpActions().subscribe(x => this.rowData = x);
    }

    createColumnDefs() {
        this.columnDefs = [
            {
                headerName: '#', width: 30, checkboxSelection: false, suppressSorting: true,
                suppressMenu: true, pinned: true
            },
            {headerName: "Due Date", field: "DueDate", width: 150, filter: 'text'},
            {headerName: "Reference", field: "Reference", width: 150, filter: 'text'},
            {headerName: "EventType", field: "EventType", width: 150, filter: 'text'},
            {headerName: "Subject", field: "Subject", width: 150, filter: 'text'},
            {headerName: "Issuer", field: "IssuerCode", width: 150, filter: 'text'}
        ]
    }

}

                        

            

