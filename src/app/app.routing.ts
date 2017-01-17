/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";

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
            {path: 'about', component: AboutComponent},

            // {path: 'corporateaction-add', component: CorpActionAddComponent},
            // {path: 'corporateaction-add-offline/:offlineReference', component: CorpActionAddComponent},
            // {path: 'corporateaction-list', component: CorpActionListComponent},
            // {path: 'corporateaction-offline-list', component: CorpActionOfflineListComponent},

            {path: 'staticdata-asset', component: AssetComponent},
            {path: 'staticdata-issuer', component: IssuerComponent},
            {path: 'staticdata-eventtypes', component: EventTypesComponent},

            {path: 'archive', component: ArchiveComponent, children: [
                {path: 'trade', component: TradeComponent},
                {path: 'transfer', component: TransferComponent}
                ]
            }            
        ]
    },

];

export const routing = RouterModule.forRoot(routes, {useHash: true}) ;
