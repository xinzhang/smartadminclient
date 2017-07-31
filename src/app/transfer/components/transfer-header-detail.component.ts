import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { TransferDblKeyModel } from '../../models/transfer-dblkey.model';
@Component({
  selector: 'transfer-header-detail',
  templateUrl: './transfer-header-detail.component.html',
  styleUrls: ['../transfer.component.css']
})
export class TransferHeaderDetailComponent implements OnInit {

    @Input()
    transferList : TransferDblKeyModel[] 

    constructor() {     
    }

    ngOnInit() {
    }

}
