import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import {JqueryUiModule} from "../shared/ui/jquery-ui/jquery-ui.module";
import {SmartadminEditorsModule} from "../shared/forms/editors/smartadmin-editors.module";
import {SimpleNotificationsModule} from 'angular2-notifications';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import {TaxRoutes} from './tax.router';

import {TaxComponent} from './tax.component';
import {TaxClientsComponent} from './taxClients.component';
import {TaxContactsComponent} from './taxContacts.component';
import {TaxReportsComponent} from './taxReports.component';
import {TaxDataTableComponent} from './taxDataTable.component';
import {DistDataTableComponent} from './distDataTable.component';
import {TaxEmailComponent} from './taxEmail.component';
import {TaxTemplatesComponent} from './taxTemplates.component';
import {TaxReportLogComponent} from './taxReportLog.component';

import {MultipleLinesPipe} from '../shared/pipes/multiple-lines.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SmartadminModule,
    SmartadminInputModule,
    SmartadminDatatableModule,
    JqueryUiModule,
    SmartadminEditorsModule,
    SimpleNotificationsModule,    
    Ng2Bs3ModalModule,
    TaxRoutes
  ],
  declarations: [
    TaxComponent,
    TaxClientsComponent,
    TaxContactsComponent,
    TaxReportsComponent,
    TaxDataTableComponent,
    DistDataTableComponent,
    TaxEmailComponent,
    TaxTemplatesComponent,
    TaxReportLogComponent,
    MultipleLinesPipe
  ]
})
export class TaxModule { }
