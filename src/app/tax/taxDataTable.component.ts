import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxContact } from '../models/taxContact.model';
import { TaxTrackingService } from '../services/taxTracking.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'tax-datatable',
    providers: [TaxTrackingService],
    styleUrls: ['./taxDataTable.component.css'],
    templateUrl: './taxDataTable.component.html'
})
export class TaxDataTableComponent implements OnInit {

    clientCode = '';
    dataSource = [];

    dataLoading: boolean = false;
    
    constructor(private taxTrackingService: TaxTrackingService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit(): void {
        //get client code from router
        this.clientCode = this.route.snapshot.params["clientCode"];

        //if (this.clientCode != "") {
            this.dataLoading = true;
            this.taxTrackingService.getCurrentTaxReport(this.clientCode)
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
        this.taxTrackingService.downloadCurrentTaxReport(this.clientCode)
            .subscribe( x=> {
                const filename = this.clientCode + "_tax_" + this.getDateFormatted() + ".csv";
                const data = new Blob([x], { type: '"text/csv;' });
                FileSaver.saveAs(data, filename);
            })
    }

}