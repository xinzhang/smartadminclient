/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';

import {TransferComponent} from './transfer.component';
import {TransferAddComponent} from './transfer-add.component';
import {TransferUpdateComponent} from './transfer-update.component';
import {TransferConfirmComponent} from './transfer-confirm.component';

export const routes: Routes = [
    //{path: '', component: TransferComponent},
    {path: 'add', component: TransferAddComponent},
    {path: 'update', component: TransferUpdateComponent},
    {path: 'confirm', component: TransferConfirmComponent}
];

export const TransferRoutes = RouterModule.forChild(routes);

