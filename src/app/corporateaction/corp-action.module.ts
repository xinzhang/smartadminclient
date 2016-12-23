import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {SmartadminDatatableModule} from "../shared/ui/datatable/smartadmin-datatable.module";
import {JqueryUiModule} from "../shared/ui/jquery-ui/jquery-ui.module";

import {CorpActionAddComponent} from './corp-action-add.component';
import {CorpActionDetailComponent} from './corp-action-detail.component';
import {CorpActionListComponent} from './corp-action-list.component';
import {CorpActionOfflineListComponent } from './corp-action-offline-list.component';
import {CorpActionComponent} from './corp-action.component';
import {CorpActionConfirmComponent} from './corp-action-confirm.component';
import {CorpActionRoutes} from "./corp-action.router";
import {TestComponent} from './test.component';

import {UploaderComponent} from '../shared/uploader/uploader.component';
import {FileSelectDirective} from 'ng2-file-upload';

import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
import {SmartadminEditorsModule} from "../shared/forms/editors/smartadmin-editors.module";
import {SimpleNotificationsModule} from 'angular2-notifications';
import {ValidatorsModule} from '../shared/validators/validators.module';
import {AgGridModule} from 'ag-grid-ng2/main';

import {DataTableModule} from '../shared/datatable/datatable.module';

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'amq-ops',
    storageType: 'localStorage'
};
 
@NgModule({
  imports: [
    CommonModule,
    CorpActionRoutes,    
    SmartadminModule,
    SmartadminInputModule,
    SmartadminDatatableModule,
    JqueryUiModule,
    SmartadminEditorsModule,
    SimpleNotificationsModule,
    ValidatorsModule,  
    DataTableModule,  
    FormsModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
      CorpActionAddComponent, CorpActionDetailComponent, CorpActionListComponent, CorpActionOfflineListComponent,
      CorpActionComponent, CorpActionConfirmComponent, 
      UploaderComponent, FileSelectDirective,
      TestComponent
  ],
  providers: [
    LocalStorageService,
        {
            provide: LOCAL_STORAGE_SERVICE_CONFIG, useValue: localStorageServiceConfig
        }    
  ]
})
export class CorpActionModule { }
