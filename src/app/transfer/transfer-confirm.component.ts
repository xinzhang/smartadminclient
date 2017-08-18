import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { TransferDblKeyModel } from '../models/transfer-dblkey.model';
import {TransferSearchModel} from '../models/transfer-search.model';
import { TransferDetailModel } from '../models/transfer-detail.model';

import {TransferConfirmInputComponent} from './components/transfer-confirm-input.component';
import {TransferDblKeyService} from '../services/transferDblKey.service';


@Component({
  selector: 'transfer-confirm',
  templateUrl: './transfer-confirm.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferConfirmComponent implements OnInit {
  searchedTransferList : TransferDblKeyModel[] = new Array();
  search : TransferSearchModel = new TransferSearchModel("","","","","");
  searchReturnResult: boolean = false;

  transfer = new TransferDblKeyModel ("", "", 0,"", "","", "","", "",false);
  transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");

  constructor(private transferService: TransferDblKeyService) {     
  }

  ngOnInit() {
  }

  isSearchEmpty() {
    return (
      this.search.APIR == "" && 
      this.search.Qty == "" &&
      this.search.ReceivedDate == "" &&
      this.search.ReferenceNo == "" &&
      this.search.SequenceID == ""
    );
  }

  refresh() {
      this.transfer = new TransferDblKeyModel ("", "", 0,"", "","", "","", "",false);
      this.transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");
  }

  searchAction($event) {
    this.refresh();
    
    this.transferService.search($event.value)
      .subscribe(data => {        
        this.searchedTransferList = data;
        this.searchReturnResult = (this.searchedTransferList.length == 0 ? true:false);

        if (this.searchedTransferList.length == 1) {
          this.transfer = this.searchedTransferList[0];
          this.transferDetail = this.searchedTransferList[0].TransferDetails[0];
        }
      });
  }

  confirmTransferDetail($event:any) {
    console.log($event);

    this.transferService.confirmTransferDetail(this.transfer)
      .subscribe(x => {
        this.transferDetail.Status = x.Message;
      });

  }

  selectItemEvent($event:any) {
    console.log($event.value);
    this.transfer =  $event.value;
    this.transferDetail = this.transfer.TransferDetails[0];
  }

}
