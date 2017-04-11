import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import {CoreModule} from "./core/core.module";
import {SmartadminLayoutModule} from "./shared/layout/layout.module";

//XZ - add application level module

import {SmartadminModule} from './shared/smartadmin.module'
import {AppComponent} from './app.component';

import {AboutComponent} from './about/about.component';

import {CorpActionModule} from './corporateaction/corp-action.module';
import {TaxModule} from './tax/tax.module';

import {AssetComponent} from './datasetup/asset.component';
import {IssuerComponent} from './datasetup/issuer.component';
import {EventTypesComponent} from './datasetup/eventtypes.component';
import {ArchiveComponent} from './archive/archive.component';
import {TradeComponent} from './archive/trade.component';
import {TransferComponent} from './archive/transfer.component';

import {UserModule} from "./shared/user/user.module";
import {UserService} from "./shared/user/user.service";

import { CorporateActionService} from './services/corporateaction.service';
import { StaticDataService} from './services/staticdata.service';


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    AssetComponent, IssuerComponent, EventTypesComponent,
    ArchiveComponent, TradeComponent, TransferComponent        
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,

    CoreModule,
    SmartadminLayoutModule,
    routing,

    CorpActionModule,
    TaxModule,
    SmartadminModule,
    UserModule.forRoot()        
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    // ENV_PROVIDERS,
    APP_PROVIDERS,
    UserService, StaticDataService, CorporateActionService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}


}

