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

import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';

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
  
  @ViewChild('modal') modal: ModalComponent;
  modalMessage :string = '';
  modalTitle: string = '';

  //public myForm: FormGroup;
  
  constructor(private transferService: TransferDblKeyService,
              private localStorageService: LocalStorageService,
              private _fb:FormBuilder) {     
    this.addedTransferList = new Array();
  }

  ngOnInit() {
    this.loadOfflineTransfersList();    
    // this.myForm = this._fb.group({
    //   transferHeader: this._fb.group({
    //     investor:[this.transfer.Investor],
    //     transferee:[this.transfer.Transferee]
    //   })
    // })
    // console.log(this.myForm.controls)
  }

  loadOfflineTransfersList() {
      const key = "offline-doublekeys-transfer_" + moment().format("YYYY-MM-DD")      
      if (this.localStorageService.get( key ) != null) {
        this.addedTransferList = JSON.parse(this.localStorageService.get(key).toString());
      }
  }

  saveOfflineTransfersList() {
      const key = "offline-doublekeys-transfer_" + moment().format("YYYY-MM-DD")
      this.localStorageService.set(key, JSON.stringify(this.addedTransferList) );
  }

  newTransfer($event:any) {  
    console.log('newTransfer: ', $event.value);   
    this.modalTitle = 'Warning';    
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

        //don't need to show it, as this will be added in the below grid.
        //this.showModalConfirm(x);
        
        //add the item to the result list
        newTransfer.SequenceID = x.TransferSequenceID;
        newTransfer.TransferDetails[0].Status = "Added";
        this.addedTransferList.push(newTransfer);
        this.saveOfflineTransfersList();

        //get a new sequence
        this.transferService.getTransferSequenceID(this.transfer.Organisation.toUpperCase())
          .subscribe(x => this.transfer.SequenceID  = x);
        
      });
  }

  showModalConfirm(x: any) {
    this.modalTitle = "Information";
    this.modalMessage = `Your sequence ID is ${x.TransferSequenceID}.`
    if (x.Message != "") {
      this.modalMessage += `<p></p> {$x.Message}.`;
    }
    this.modal.open();
  }

  onClose() {    
      console.log('modal close event');
  }

  onOpen() {
  }

  onDismiss() {
      console.log('modal dismissed event');
  }  

  newRequest() {
    console.log('request new');
    this.modal.close();
    this.transfer = new TransferDblKeyModel ("", "", 0,"", "","", "","", "",false);
    this.transferDetail = new TransferDetailModel("","",0,"","",0,"",0,"");    
  }

}
