import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {JqueryUiModule} from "../shared/ui/jquery-ui/jquery-ui.module";

import {CorpActionAddComponent} from './corp-action-add.component';
import {CorpActionDetailComponent} from './corp-action-detail.component';
import {CorpActionListComponent} from './corp-action-list.component';

import {UploaderComponent} from '../shared/uploader/uploader.component';
import {FileSelectDirective} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,    
    SmartadminModule,
    SmartadminInputModule,
    JqueryUiModule
  ],
  declarations: [CorpActionAddComponent, CorpActionDetailComponent, CorpActionListComponent, UploaderComponent, FileSelectDirective]
})
export class CorpActionModule { }
