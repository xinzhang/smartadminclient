import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TransferComponent} from './transfer.component.ts';
import {TransferAddComponent} from './transfer-add.component';
import {TransferUpdateComponent} from './transfer-update.component';
import {TransferConfirmComponent} from './transfer-confirm.component';
import {TransferDetailComponent} from './components/transfer-detail.component';
import {TransferHeaderComponent} from './components/transfer-header.component';
import {TransferSearchComponent} from './components/transfer-search.component';
import {TransferHeaderDetailComponent} from './components/transfer-header-detail.component';
import {TransferConfirmInputComponent} from './components/transfer-confirm-input.component';

import {TransferRoutes} from "./transfer.router";

import {TransferDblKeyService} from "../services/transferDblKey.service";

import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import {JqueryUiModule} from "../shared/ui/jquery-ui/jquery-ui.module";

import {SmartadminEditorsModule} from "../shared/forms/editors/smartadmin-editors.module";
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ValidatorsModule} from '../shared/validators/validators.module';

// import {DataTableModule} from '../shared/datatable/datatable.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import {StorageModule} from '../localStorage/storage.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StorageModule,
    TransferRoutes,
    SmartadminModule,
    SmartadminInputModule,
    SmartadminDatatableModule,
    JqueryUiModule,
    SmartadminEditorsModule,
    SimpleNotificationsModule.forRoot(),
    ValidatorsModule,  
    Ng2Bs3ModalModule
  ],
  declarations: [
    TransferAddComponent,
    TransferUpdateComponent,
    TransferConfirmComponent,
    TransferDetailComponent,
    TransferHeaderComponent,
    TransferHeaderDetailComponent,
    TransferConfirmInputComponent,
    TransferSearchComponent
    ],
  providers: [
    TransferDblKeyService
  ]
})

export class TransferModule { }
