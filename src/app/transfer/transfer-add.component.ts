import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';

import { TransferDblKeyModel } from '../models/transfer-dblkey.model';
import { TransferDetailModel } from '../models/transfer-detail.model';

import {TransferDetailComponent} from './components/transfer-detail.component';
import {TransferHeaderComponent} from './components/transfer-header.component';
import {TransferHeaderDetailComponent} from './components/transfer-header-detail.component';

import {TransferDblKeyService} from '../services/transferDblKey.service';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Animations } from '../shared/animations';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'transfer-add',
  templateUrl: './transfer-add.component.html',
  styleUrls: ['./transfer.component.css'],
  animations: Animations.page,  
})
export class TransferAddComponent implements OnInit {

  addedTransferList : TransferDblKeyModel[];

  transfer = new TransferDblKeyModel ("", "", 0,"", "","", "","", "",false);
  transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");
   
  modalMessage :string = '';
  @ViewChild('modal') modal: ModalComponent;

  constructor(private transferService: TransferDblKeyService) {     
    this.addedTransferList = new Array();
  }

  ngOnInit() {

  }

  newTransfer($event:any) {  
    console.log('newTransfer: ', $event.value);   
    this.modalMessage = 'This will clean out the current transfer request header and start a new transfer. Are you sure you want to do this?';
    this.modal.open();
  }

  getSequenceID($event:any) {
    this.transfer.Organisation = $event.value.toUpperCase();
    this.transferService.getTransferSequenceID($event.value.toUpperCase())
      .subscribe(x => this.transfer.SequenceID  = x);      
  }

  saveTransferDetail($event:any) {

     let transferDetail = new TransferDetailModel(
       $event.value.SubType,
       $event.value.Asset,
       $event.value.QtyInstructed,
       $event.value.RecDate,
       $event.value.TransferReference,
       0,
       "",
       0,
       ""
     );
    
    let newTransfer = new TransferDblKeyModel(
      this.transfer.SequenceID,
      this.transfer.Organisation,
      this.transfer.Investor,
      this.transfer.InvestorName,
      this.transfer.InvestorId,
      this.transfer.RequestType,
      this.transfer.ReceivedDate,
      this.transfer.Transferee,
      this.transfer.Group,
      this.transfer.Ncbo);
    
    newTransfer.TransferDetails.push(transferDetail);

    this.transferService.addTansferDetail(newTransfer)
      .subscribe(x => {                
        this.transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");
        
        console.log(this, this.transferDetail, this.transfer);
        console.log(this.addedTransferList);

        this.transferService.getTransferSequenceID(this.transfer.Organisation.toUpperCase())
          .subscribe(x => this.transfer.SequenceID  = x);
        this.addedTransferList.push(newTransfer);
      });
  }

  onClose() {    
      console.log('modal close event');
  }

  onOpen() {
  }

  onDismiss() {
      console.log('modal dismissed event');
  }  

}
