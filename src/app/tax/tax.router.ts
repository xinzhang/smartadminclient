
import {Routes, RouterModule} from '@angular/router';
import {TaxClientsComponent} from './taxClients.component'

export const routes: Routes = [
    //{path: '', component: TaxComponent},
    {path: 'clients', component: TaxClientsComponent}
];

export const TaxRoutes = RouterModule.forChild(routes);
