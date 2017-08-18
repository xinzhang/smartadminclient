import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import * as moment from 'moment';
import { TransferDetailModel } from '../../models/transfer-detail.model';
import { SelectListValue } from '../../models/selectListValue.model';

@Component({
  selector: 'transfer-confirm-input',
  templateUrl: './transfer-confirm-input.component.html',
  styleUrls: ['../transfer.component.css']
})
export class TransferConfirmInputComponent implements OnInit {
  @Input()
  sequenceID:string;

  @Input()
  updateMode: boolean = true;

  @Input()
  transferDetail:TransferDetailModel;

  @Output()
  transferConfirmedEvent = new EventEmitter();
  
  SubType : SelectListValue[] = [
    new SelectListValue("TAC", "TransferIn - Adjustment Credit"),
    new SelectListValue("TCC", "TransferIn - Commission Credit"),
    new SelectListValue("TCA", "TransferIn - Corporate Action Allocation"),
    new SelectListValue("TI", "TransferIn - Default"),
    new SelectListValue("TFM", "TransferIn - Fund Manager"),
    new SelectListValue("TSI", "TransferIn - Switch In"),
    new SelectListValue("TAD", "TransferOut - Default"),
    new SelectListValue("TCO", "TransferOut - Fee"),
    new SelectListValue("TCD", "TransferOut - Fund Termination"),
    new SelectListValue("TO", "TransferOut - Switch Out")
  ]
  
  constructor() {     
  }

  ngOnInit() {    
  }

  confirmDateChanged($dateTime: string) {
    this.transferDetail.DateConfirmed = $dateTime;        
  }

  saveConfirmAction() {
    console.log(this.transferDetail);
    this.transferConfirmedEvent.emit({
      value: this.transferDetail
    })
  }
}
