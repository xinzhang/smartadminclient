
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
import {SharePointDocumentsComponent} from './sharepoint-docs.component';
import {TestComponent} from './test.component';
import {CorpActionEmailComponent} from './corp-action-email.component';

export const routes: Routes = [
    //{path: '', component: CorpActionComponent},
    {path: 'add', component: CorpActionAddComponent},
    {path: 'edit/:refno', component: CorpActionAddComponent},
    {path: 'email/:refno', component: CorpActionEmailComponent},
    {path: 'add-offline/:offlineReference', component: CorpActionAddComponent},
    {path: 'list', component: CorpActionListComponent},
    {path: 'confirm/:reference', component: CorpActionConfirmComponent},
    {path: 'offline-list', component: CorpActionOfflineListComponent},
    {path: 'sharepoint-docs', component: SharePointDocumentsComponent},
    {path: 'test', component:TestComponent}
];

export const CorpActionRoutes = RouterModule.forChild(routes);
