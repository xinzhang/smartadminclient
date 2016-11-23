import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SmartadminModule} from "../shared/smartadmin.module";
import {SmartadminInputModule} from "../shared/forms/input/smartadmin-input.module";
import {JqueryUiModule} from "../shared/ui/jquery-ui/jquery-ui.module";

import {CorpActionAddComponent} from './corp-action-add.component';
import {CorpActionDetailComponent} from './corp-action-detail.component';
import {CorpActionListComponent} from './corp-action-list.component';

@NgModule({
  imports: [
    CommonModule,    
    SmartadminModule,
    SmartadminInputModule,
    JqueryUiModule
  ],
  declarations: [CorpActionAddComponent, CorpActionDetailComponent, CorpActionListComponent]
})
export class CorpActionModule { }
