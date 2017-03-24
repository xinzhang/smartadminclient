import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxContact } from '../models/taxContact.model';
import { TaxTrackingService } from '../services/taxTracking.service';

@Component({
    selector: 'dist-datatable',
    providers: [TaxTrackingService],
    styleUrls: ['./taxDataTable.component.css'],
    templateUrl: './distDataTable.component.html'
})
export class DistDataTableComponent implements OnInit {

    clientCode = '';
    dataSource = [];

    dataLoading:boolean = false;

    constructor(private taxTrackingService: TaxTrackingService,
                private route: ActivatedRoute,
                private router: Router) {        
    }

    ngOnInit(): void {
        //get client code from router
        this.clientCode = this.route.snapshot.params["clientCode"];
        console.log(this.clientCode);

        //if (this.clientCode != "") {
            this.dataLoading = true;

            this.taxTrackingService.getCurrentDistributionReport(this.clientCode)
             .subscribe(x => {
                 this.dataLoading = false;
                 this.dataSource = x;                         
             });
        //}
    }

}