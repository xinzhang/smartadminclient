import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import {TransferSearchModel} from '../../models/transfer-search.model';

@Component({
    selector: 'transfer-search',
    templateUrl: './transfer-search.component.html',
    styleUrls: ['../transfer.component.css']
})
export class TransferSearchComponent implements OnInit {
    
    @Input()
    search: TransferSearchModel;
  
    @Output()
    transferSearchEvent = new EventEmitter();

    ngOnInit(){}

    searchAction() {
        this.transferSearchEvent.emit({
            value: this.search
        });
    }

}