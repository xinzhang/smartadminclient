import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { TransferDblKeyModel } from '../models/transfer-dblkey.model';
import {TransferSearchModel} from '../models/transfer-search.model';
import { TransferDetailModel } from '../models/transfer-detail.model';

import {TransferConfirmInputComponent} from './components/transfer-confirm-input.component';
import {TransferDblKeyService} from '../services/transferDblKey.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  selector: 'transfer-update',
  templateUrl: './transfer-update.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferUpdateComponent implements OnInit {
  searchedTransferList : TransferDblKeyModel[] = new Array();
  search : TransferSearchModel = new TransferSearchModel("","","","","");
  searchReturnResult: boolean = false;

  transfer = new TransferDblKeyModel ("", "", 0,"", "","", "","", "",false);
  transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");

  @ViewChild('modal') modal: ModalComponent;

  constructor(private transferService: TransferDblKeyService) {     
  }

  ngOnInit() {
  }

  refresh() {
      this.transfer = new TransferDblKeyModel ("", "", 0,"", "","", "","", "",false);
      this.transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");
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

  updateItemEvent($event:any) {
    console.log($event.value);
    this.transfer =  $event.value;
    this.transferDetail = this.transfer.TransferDetails[0];

    this.modal.open('lg');
  }

  updateTransfer() {
    this.transferService.updateTansferDetail(this.transfer)
      .subscribe(x => {                        
          this.transfer = new TransferDblKeyModel ("", "", 0,"", "","", "","", "",false);
          this.transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");        
          this.modal.close();
      });
  }

}
