/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {ModuleWithProviders} from "@angular/core";

import {AboutComponent} from './about/about.component';

import {CorpActionListComponent} from './corporateaction/corp-action-list.component';
import {CorpActionOfflineListComponent} from './corporateaction/corp-action-offline-list.component';

import {CorpActionDetailComponent} from './corporateaction/corp-action-detail.component';
import {CorpActionAddComponent} from './corporateaction/corp-action-add.component';

import {AssetComponent} from './datasetup/asset.component';
import {IssuerComponent} from './datasetup/issuer.component';
import {EventTypesComponent} from './datasetup/eventtypes.component';

import {ArchiveComponent} from './archive/archive.component';
import {TradeComponent} from './archive/trade.component';
import {TransferComponent} from './archive/transfer.component';

import {TaxComponent} from './tax/tax.component';
import {TaxClientsComponent} from './tax/taxClients.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: 'app/+home/home.module#HomeModule'
            },
            {
                path:'corporateaction',
                loadChildren: 'app/corporateaction/corp-action.module#CorpActionModule'
            },
            {
                path:'tax',
                loadChildren: 'app/tax/tax.module#TaxModule'
            },
            {path: 'about', component: AboutComponent},
            {path: 'staticdata-asset', component: AssetComponent},
            {path: 'staticdata-issuer', component: IssuerComponent},
            {path: 'staticdata-eventtypes', component: EventTypesComponent},
            {path: 'archive', component: ArchiveComponent, children: [
                {path: 'trade', component: TradeComponent},
                {path: 'transfer', component: TransferComponent}
                ]
            },
        ]
    },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
