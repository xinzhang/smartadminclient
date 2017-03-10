import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaxClient } from '../models/taxClient.model';
import { TaxContact } from '../models/taxContact.model';
import { TaxTrackingService } from '../services/taxTracking.service';

import {TaxContactsComponent} from './taxContacts.component';

@Component({
    selector: 'tax-clients',
    styleUrls: ['./tax.component.css'],
    providers: [TaxTrackingService],
    templateUrl: './taxClients.component.html'
})
export class TaxClientsComponent implements OnInit {

    taxClients: TaxClient[] = [];
    selectedClientCode: TaxClient;

    @ViewChild('taxContacts') taxContacts: TaxContactsComponent;

    constructor(private taxTrackingService: TaxTrackingService,
        private route: ActivatedRoute) {
        
        this.selectedClientCode = new TaxClient(-1, '','',0,'',[],[]);
        console.log(this.selectedClientCode);
    }

    ngOnInit() {
        this.taxTrackingService.getClients()
            .subscribe(x => this.taxClients = x);
    }

    refreshClients() {
        this.taxTrackingService.getClients()
            .subscribe(x => this.taxClients = x);        
    }

    setClientCode($event: any) {        
        this.selectedClientCode = this.taxClients.find(x => x.ClientCode == $event.target.value);
    }
    setReportChannel($event: any) {
        this.selectedClientCode.ReportChannel = $event.target.value;
    }
    setReportTypes($event:any){
        let val = $event.target.value;
        let idx = this.selectedClientCode.TemplateTypes.indexOf(val);
        if ( idx == -1) {
            //attach the value
            this.selectedClientCode.TemplateTypes.push(val);
        } else {            
            this.selectedClientCode.TemplateTypes.splice(idx, 1);
        }
    }

    addNewContact() {
        if (this.selectedClientCode.TaxClientID !== -1) {
            let isPrimary:boolean = (this.selectedClientCode.Contacts.length == 0);                        
            this.selectedClientCode.Contacts.push(new TaxContact(-1, "","","","", true, isPrimary));
            this.taxContacts.editDetail(this.selectedClientCode.Contacts.length - 1);            
        }
    }

    saveContactDetail($event) {        
        this.selectedClientCode.Contacts = $event.value;
    }

    submit() {
        this.taxTrackingService.saveClient(this.selectedClientCode)
            .subscribe(
            );        
    }
}