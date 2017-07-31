import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { TransferDblKeyModel } from '../../models/transfer-dblkey.model';
import { TransferDblKeyService } from '../../services/transferDblKey.service';

@Component({
  selector: 'transfer-header',
  templateUrl: './transfer-header.component.html',
  styleUrls: ['../transfer.component.css']
})
export class TransferHeaderComponent implements OnInit {
  @Input()
  transfer : TransferDblKeyModel;   

  @Output()
  newTransferButtonClickEvent = new EventEmitter();

  @Output()
  getSequenceIDEvent = new EventEmitter();
  
  requestTypes : string[] = ["Transfer In", "Transfer Out"];
  ncboValues: string[] = ["Yes", "No"];
  organisation = new FormControl();

  constructor(private transferService: TransferDblKeyService) {  
  }

  ngOnInit() {
    console.log('header constructor');
    
    this.organisation.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe( v => {
        this.getSequenceID(v)
      })
      //.switchMap( v => this.getSequenceID(v));
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
