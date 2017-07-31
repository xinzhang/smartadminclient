import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import * as moment from 'moment';
import { TransferDetailModel } from '../../models/transfer-detail.model';
@Component({
  selector: 'transfer-detail',
  templateUrl: './transfer-detail.component.html',
  styleUrls: ['../transfer.component.css']
})
export class TransferDetailComponent implements OnInit {
  @Input()
  transferDetail:TransferDetailModel;

  @Input()
  IsFormValid:boolean;

  @Output()
  transferDetailSavedEvent = new EventEmitter();

  SubType : string[] = ["Transfer In", "Transfer Out"];
  
  constructor() {     
  }

  ngOnInit() {    
  }

  recDateChanged($dateTime: string) {
    this.transferDetail.RecDate = $dateTime;        
  }

  saveDetailAction() {
    this.transferDetailSavedEvent.emit({
      value: this.transferDetail
    })
  }
}
