
/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';

import {CorpActionListComponent} from './corp-action-list.component';
import {CorpActionOfflineListComponent} from './corp-action-offline-list.component';
import {CorpActionDetailComponent} from './corp-action-detail.component';
import {CorpActionAddComponent} from './corp-action-add.component';
import {CorpActionConfirmComponent} from './corp-action-confirm.component';
import {CorpActionComponent} from './corp-action.component';

export const routes: Routes = [
    //{path: '', component: CorpActionComponent},
    {path: 'add', component: CorpActionAddComponent},
    {path: 'add-offline/:offlineReference', component: CorpActionAddComponent},
    {path: 'list', component: CorpActionListComponent},
    {path: 'confirm/:reference', component: CorpActionConfirmComponent},
    {path: 'offline-list', component: CorpActionOfflineListComponent}
];

export const CorpActionRoutes = RouterModule.forChild(routes);
