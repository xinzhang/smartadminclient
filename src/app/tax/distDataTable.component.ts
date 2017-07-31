import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxContact } from '../models/taxContact.model';
import { TaxTrackingService } from '../services/taxTracking.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'dist-datatable',
    providers: [TaxTrackingService],
    //styleUrls: ['./taxDataTable.component.css'],
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

    getDateFormatted() {
        let d = new Date();
        return d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate();
    }

    download() {
        this.taxTrackingService.downloadCurrentDistributionReport(this.clientCode)
            .subscribe( x=> {
                const filename = this.clientCode + "_distribution_" + this.getDateFormatted() + ".csv";
                const data = new Blob([x], { type: '"text/csv;' });
                FileSaver.saveAs(data, filename);
            })
    }
}