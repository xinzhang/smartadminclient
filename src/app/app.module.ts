import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";

import {SmartadminModule} from './shared/smartadmin.module'
import {AppComponent} from './app.component';

import {AboutComponent} from './about/about.component';


import {CorpActionModule} from './corporateaction/corp-action.module';
// import {CorpActionAddComponent} from './corporateaction/corp-action-add.component';
// import {CorpActionDetailComponent} from './corporateaction/corp-action-detail.component';
// import {CorpActionListComponent} from './corporateaction/corp-action-list.component';

import {AssetComponent} from './datasetup/asset.component';
import {IssuerComponent} from './datasetup/issuer.component';
import {EventTypesComponent} from './datasetup/eventtypes.component';
import {ArchiveComponent} from './archive/archive.component';
import {TradeComponent} from './archive/trade.component';
import {TransferComponent} from './archive/transfer.component';

import {routing} from './app.routing';
import {BrowserModule} from "@angular/platform-browser";
import {UserModule} from "./shared/user/user.module";
import {UserService} from "./shared/user/user.service";

import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CorporateActionService} from './services/corporateaction.service';
import { StaticDataService} from './services/staticdata.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent, 
    //CorpActionAddComponent, CorpActionListComponent, CorpActionDetailComponent, 
    AssetComponent, IssuerComponent, EventTypesComponent,
    ArchiveComponent, TradeComponent, TransferComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CorpActionModule,
    routing,
    SmartadminModule.forRoot(),
    UserModule.forRoot(),
    DatepickerModule
  ],
  providers: [UserService, StaticDataService, CorporateActionService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
