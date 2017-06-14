
import {Component, OnDestroy, Input, Output, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaxTrackingService } from '../services/taxTracking.service';
import { TaxEmail } from '../models/taxEmail.model';
//TN
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import * as FileSaver from 'file-saver';

declare var $: any;

@Component({
  selector: 'tax-email',
  styleUrls: ['./tax.component.css'],
  providers: [TaxTrackingService],
  templateUrl: './taxEmail.component.html'
})
export class TaxEmailComponent implements OnInit, OnDestroy{
    
    errorMessage: string = "";
    currentEmailCC: string = "";

    taxEmail: TaxEmail = new TaxEmail("","","", "", "", "", "","");
    
    EmailType: string = "";
    ClientCode : string = "";
    DateStamp : string = "";

    //removed the summer note as it is not working as expected
    //@ViewChild('summernote') summernote: any;

    //TN
    @ViewChild('modal') modal: ModalComponent;

    constructor(private taxTrackingService: TaxTrackingService,
        private route: ActivatedRoute,
        private router: Router) {}

    ngOnInit() {
        this.EmailType = this.route.snapshot.params["emailType"];
        this.ClientCode = this.route.snapshot.params["clientCode"];
        this.DateStamp = this.getDateFormatted();

        this.taxTrackingService.getEmailTemplate(this.EmailType, this.ClientCode)
        .subscribe(d => {
            this.taxEmail = d;  

            //add special code for the summernote assignment
            //$(this.summernote.nativeElement).summernote('editor.pasteHTML', this.taxEmail.EmailBody);
                      
        })         
    }

    getDateFormatted() {
        let d = new Date();
        return d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate();
    }

    ngOnDestroy() {        
    }   
       
    addEmailCC() {
        if (this.currentEmailCC != "") {
            this.taxEmail.EmailCC += ';' + this.currentEmailCC;
            this.currentEmailCC = "";
        }
    }

    removeEmailCC(val: any) {
        let index = this.taxEmail.EmailCC.indexOf(val);
        //this.taxEmail.EmailCC.splice(index, 1);        
    } 

    // emailBodyChanged(event) {    
    //     this.taxEmail.EmailBody = event.value;
    // }

    submitting = false;
    downloadingTax = false;
    downloadingDist = false;

    onSubmit(f) {

        this.submitting = true;
        
        //summer note br cleanup
        // this.taxEmail.EmailBody = this.taxEmail.EmailBody.split('<br>').join('');
        // this.taxEmail.EmailBody = this.taxEmail.EmailBody.split('<p></p>').join('');
        
        //TN:
        this.modal.open();
    }

    downloadTax() {
        this.downloadingTax = true;
        this.taxTrackingService.downloadCurrentDistributionReport(this.ClientCode)
            .subscribe( x=> {                
                const filename = this.ClientCode + "_distribution_" + this.getDateFormatted() + ".csv";
                const data = new Blob([x], { type: '"text/csv;' });
                FileSaver.saveAs(data, filename);
                this.downloadingTax = false;
            })
    }

    downloadDistribution() {
        this.downloadingDist = true;
        this.taxTrackingService.downloadCurrentDistributionReport(this.ClientCode)
            .subscribe( x=> {
                const filename = this.ClientCode + "_distribution_" + this.getDateFormatted() + ".csv";
                const data = new Blob([x], { type: '"text/csv;' });
                FileSaver.saveAs(data, filename);
                this.downloadingDist = false;
            })
    }

    //TN: Dialog
    onClose() {    
        this.taxTrackingService.sendTaxEmail(this.taxEmail)
         .subscribe(
            values => {                
                this.router.navigateByUrl('/tax/reports');
            },
            error => {
                console.log(error);
                this.submitting = false;
                this.errorMessage = error;
         });
    }

    onOpen() {
        
    }

    onDismiss() {
        this.submitting = false;
    }
    

    
    addCC() {
        if (this.currentEmailCC != "") {
        this.taxEmail.EmailCCs.push(this.currentEmailCC);
        this.taxEmail.EmailCCLabels.push(this.currentEmailCC);
        this.currentEmailCC = "";
        }
  }
    
}
