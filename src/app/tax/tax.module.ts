import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import {JqueryUiModule} from "../shared/ui/jquery-ui/jquery-ui.module";

import {SimpleNotificationsModule} from 'angular2-notifications';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import {TaxRoutes} from './tax.router';

import {TaxComponent} from './tax.component';
import {TaxClientsComponent} from './taxClients.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SmartadminModule,
    SmartadminInputModule,
    SmartadminDatatableModule,
    JqueryUiModule,
    SimpleNotificationsModule,    
    Ng2Bs3ModalModule,
    TaxRoutes
  ],
  declarations: [
    TaxComponent,
    TaxClientsComponent
  ]
})
export class TaxModule { }
