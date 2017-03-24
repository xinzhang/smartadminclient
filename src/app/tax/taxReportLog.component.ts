import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxTrackingService } from '../services/taxTracking.service';
import { DatatableComponent } from '../shared/ui/datatable/datatable.component';

import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'tax-report-log',
    styleUrls: ['./tax.component.css'],
    providers: [TaxTrackingService],
    templateUrl: './taxReportLog.component.html',
})
export class TaxReportLogComponent {
    reportLogs = [];
    reportDate = '';

    @ViewChild(DatatableComponent) dt: DatatableComponent;

    constructor(private taxTrackingService: TaxTrackingService, private router: Router) {
    }

    ngOnInit() {
    }

    refresh() {        
        this.reportDate = '';
        this.dt.refreshData('api/tax/reports/history');
    }

    public options = {
        "ajax": {
            "url": 'api/tax/reports/history',
            "dataSrc": ''
        },
        "iDisplayLength": 9,
        "searching": false,
        "columns": [
            { "data": "ClientCode" },
            { "data": "ReportDate"},
            { "data": "DistributionReportSent" },
            { "data": "DistributionReportSentBy" },
            { "data": "DistributionReportSentDateTime" },
            { "data": "TaxReportSent" },
            { "data": "TaxReportSentBy" },
            { "data": "TaxReportSentDateTime" }    
        ],
        "order": [[1, 'ReportDate']],
        "rowCallback" : function(row, data, index) {
            //formating yesno
            if (data.DistributionReportSent==true) {
                $(row).find('td:eq(2)').text('yes')
            }
            if (data.TaxReportSent==true) {
                $(row).find('td:eq(5)').text('yes')
            }
            if (data.DistributionReportSent==false) {
                $(row).find('td:eq(2)').text('')
            }
            if (data.TaxReportSent==false) {
                $(row).find('td:eq(5)').text('')
            }
            //
            if (data.ReportDate !== null) {
                $(row).find('td:eq(1)').text(moment(data.ReportDate).format("YYYY-MM-DD"));
            }
            if (data.DistributionReportSentDateTime !== null) {
                $(row).find('td:eq(4)').text(moment(data.DistributionReportSentDateTime).format("YYYY-MM-DD"));
            }
            if (data.TaxReportSentDateTime !== null) {
                $(row).find('td:eq(7)').text(moment(data.TaxReportSentDateTime).format("YYYY-MM-DD"));
            }
        }
    }

    reportDateChanged($dateTime: string) {                
        var rptDate = moment($dateTime, "DD/MM/YYYY").format("YYYYMMDD");
        this.dt.refreshData('api/tax/reports/' + rptDate);
    }
}


