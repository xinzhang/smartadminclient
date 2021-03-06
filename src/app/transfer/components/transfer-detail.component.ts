import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren  } from '@angular/core';
import * as moment from 'moment';
import { TransferDetailModel } from '../../models/transfer-detail.model';
import {SelectListValue} from '../../models/selectListValue.model';

@Component({
  selector: 'transfer-detail',
  templateUrl: './transfer-detail.component.html',
  styleUrls: ['../transfer.component.css']
})
export class TransferDetailComponent implements OnInit {
  @Input()
  updateMode:boolean = false;

  @Input()
  transferDetail:TransferDetailModel;

  @Input()
  IsFormValid:boolean;

  @Output()
  transferDetailSavedEvent = new EventEmitter();

  @ViewChildren('txtSubType') txtSubType;
  
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

  recDateChanged($dateTime: string) {
    this.transferDetail.RecDate = $dateTime;        
  }

  saveDetailAction() {
    this.transferDetailSavedEvent.emit({
      value: this.transferDetail
    });
    
    this.txtSubType.first.nativeElement.focus();
  }
}
