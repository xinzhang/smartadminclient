import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaxClient } from '../models/taxClient.model';
import { TaxContact } from '../models/taxContact.model';
import { TaxTrackingService } from '../services/taxTracking.service';

@Component({
    selector: 'tax-clients',
    styleUrls: ['./tax.component.css'],
    providers: [TaxTrackingService],
    templateUrl: './taxClients.component.html'
})
export class TaxClientsComponent implements OnInit {

    taxClients: TaxClient[] = [];
    selectedClientCode: TaxClient;


    constructor(private taxTrackingService: TaxTrackingService,
        private route: ActivatedRoute) {
        
        this.selectedClientCode = new TaxClient(-1, '','',0,'');
    }

    ngOnInit() {
        this.taxTrackingService.getClients()
            .subscribe(x => this.taxClients = x);
    }

    setClientCode($event: any) {        
        this.selectedClientCode = this.taxClients.find(x => x.ClientCode == $event.target.value);
    }
    setReportChannel($event: any) {
        this.selectedClientCode.ReportChannel = $event.target.value;
    }

}