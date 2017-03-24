
import {Routes, RouterModule} from '@angular/router';
import {TaxClientsComponent} from './taxClients.component';
import {TaxReportsComponent} from './taxReports.component';
import {TaxDataTableComponent} from './taxDataTable.component';
import {DistDataTableComponent} from './distDataTable.component';
import {TaxEmailComponent} from './taxEmail.component';
import {TaxTemplatesComponent} from './taxTemplates.component';
import {TaxReportLogComponent} from './taxReportLog.component';

export const routes: Routes = [
    //{path: '', component: TaxComponent},
    {path: 'reports', component: TaxReportsComponent},
    {path: 'clients', component: TaxClientsComponent},
    {path: 'taxReport/:clientCode', component:TaxDataTableComponent},
    {path: 'distReport/:clientCode', component:DistDataTableComponent},
    {path: 'taxEmail/:emailType/:clientCode', component:TaxEmailComponent},
    {path: 'templates', component:TaxTemplatesComponent},
    {path: 'reportlog', component: TaxReportLogComponent}
];

export const TaxRoutes = RouterModule.forChild(routes);
