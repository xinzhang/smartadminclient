import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { TransferDblKeyModel } from '../../models/transfer-dblkey.model';
import { TransferDblKeyService } from '../../services/transferDblKey.service';
import {SelectListValue} from '../../models/selectListValue.model';

@Component({
  selector: 'transfer-header',
  templateUrl: './transfer-header.component.html',
  styleUrls: ['../transfer.component.css']
})
export class TransferHeaderComponent implements OnInit {
  @Input()
  updateMode:boolean = false;

  @Input()
  transfer : TransferDblKeyModel;   

  @Output()
  newTransferButtonClickEvent = new EventEmitter();

  @Output()
  getSequenceIDEvent = new EventEmitter();

  // @Input('group')
  // public transferHeaderForm: FormGroup;
  
  requestTypes : SelectListValue[] = [
    new SelectListValue("AA", "Acount to Account"),
    new SelectListValue("ADJ", "Adjustment"),
    new SelectListValue("EXT", "External Transfer")
  ]

  ncboValues : SelectListValue[] = [
    new SelectListValue("true", "Yes"),
    new SelectListValue("false", "No")
  ]

  organisation = new FormControl();

  constructor(private transferService: TransferDblKeyService) {  
  }

  ngOnInit() {

    if (!this.updateMode) {
      this.organisation.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .subscribe( v => {
          this.getSequenceID(v)
        })
        //.switchMap( v => this.getSequenceID(v));
    }
  }

  receivedDateChanged($dateTime: string) {
    this.transfer.ReceivedDate = $dateTime;        
  }

  newTransferButtonClick() {
    this.newTransferButtonClickEvent.emit({
      value: this.transfer
    })
  }

  getSequenceID(v:string) {
    console.log('get sequenceid', v);
    this.getSequenceIDEvent.emit({
      value: v
    })
  }
  
}
