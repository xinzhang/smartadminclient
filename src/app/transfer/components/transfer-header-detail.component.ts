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
    transferList : TransferDblKeyModel[] ;

    @Input()
    showRemove: boolean = false;

    @Input()
    showSelect: boolean = false;

    @Input()
    showUpdate: boolean = false;

    @Output()
    removeItemEvent = new EventEmitter();

    @Output()
    selectItemEvent = new EventEmitter();

    @Output()
    updateItemEvent = new EventEmitter();

    constructor() {     
    }

    ngOnInit() {
    }

    selectItemAction(item: TransferDblKeyModel) {
      console.log(item);
      this.selectItemEvent.emit({
          value: item
      })
    }

    removeItemAction(item: TransferDblKeyModel) {
      this.removeItemEvent.emit({
          value: item
      })
    }

    updateItemAction(item: TransferDblKeyModel) {
      this.updateItemEvent.emit({
          value: item
      })
    }
}
