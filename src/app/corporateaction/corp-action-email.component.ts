
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {CorporateActionModel} from '../models/corporateactions.model';
import {CorporateActionEmailModel} from '../models/corporateaction-email.model';
import {CorporateActionService} from '../services/corporateaction.service';
import { StaticDataService } from '../services/staticdata.service';
import {UserService} from "../shared/user/user.service";
import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';

declare var $: any;

@Component({
  selector: 'corp-action-email',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-email.component.html'
})
export class CorpActionEmailComponent implements OnInit, OnDestroy{
    
    corporateAction = new CorporateActionModel("", "", "", "", "", "", "");
    corporateActionEmail = new CorporateActionEmailModel("", "", "", "");
    errorMessage: string = "";
    currentEmailBCC: string = "";

    @ViewChild('summernote') summernote: any;

    constructor(private corporateActionService: CorporateActionService,
        private staticDataService: StaticDataService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private notificationService: NotificationsService) {}

    ngOnInit() {
        let reference = this.route.snapshot.params["refno"];
        if (reference != null) {
            this.getCorpActionByReference(reference);
        }

        this.userService.getLoginInfo().subscribe(user => {
            this.corporateActionEmail.EmailFrom = user.username.replace(" ", ".") + "@ausmaq.com.au";
            this.corporateActionEmail.EmailBCC = ["All Clients"];
        })
         
    }

    ngOnDestroy() {        
    }   

    getCorpActionByReference(reference: string) {
        this.corporateActionService.getCorpActionDetail(reference).subscribe( x => {
        
            this.corporateAction.Reference = x.Reference
            this.corporateAction.DueDate = x.DueDate;

            this.corporateActionEmail.Reference = x.Reference
            this.corporateActionEmail.Documents = x.Documents;
            this.corporateActionEmail.Subject = " Corporate Action: " + x.EventType + ", " + x.Subject;

            this.corporateActionEmail.EmailBody = this.getAPIRTableHtml(x.APIRCodes, x.APIRLabels) + "<br/>" + x.Description;
            this.corporateActionEmail.EmailBody += this.getFootNote(x.Reference, x.DueDate);
        
            //add special code for the summernote assignment
            $(this.summernote.nativeElement).summernote('editor.pasteHTML', this.corporateActionEmail.EmailBody);
        });
    }

    getAPIRTableHtml(apircodes: string[], apirlabels:string[]) : string {
        let tableHtml:string = "<p>Below is the affected APIRs </p>";
        tableHtml += "<table border="1"" class='table table-bordered' width='400px'><tbody><tr><td width='150px'><b>APIR</b></td><td width='400px'><b>APIR Name</b></td></tr>";

        for (let i=0; i<apircodes.length; i++) {
            tableHtml += "<tr><td>" + apircodes[i] + "</td><td>" + apirlabels[i] + "</td></tr>"; 
        }

        tableHtml += "</tbody></table>";

        return tableHtml;
    }

    getFootNote(reference:string, duedate:string) : string {
        let footnoteHtml : string = "<br/> Please respond to us by the end of due date <b>" + duedate + "</b>";
        footnoteHtml += "<br/> The reference number for the corporate action is <b>" + reference + "</b>";

        return footnoteHtml;
    }

    addEmailBCC() {
        if (this.currentEmailBCC != "") {
            this.corporateActionEmail.EmailBCC.push(this.currentEmailBCC);
            this.currentEmailBCC = "";
        }
    }

    removeEmailBCC(val: any) {
        let index = this.corporateActionEmail.EmailBCC.indexOf(val);
        this.corporateActionEmail.EmailBCC.splice(index, 1);        
    } 

    emailBodyChanged(event) {    
        this.corporateActionEmail.EmailBody = event.value;
    }

    submitting = false;

    onSubmit(f) {

        this.submitting = true;
        
        //summer note br cleanup
        this.corporateActionEmail.EmailBody = this.corporateActionEmail.EmailBody.split('<br>').join('');
        this.corporateActionEmail.EmailBody = this.corporateActionEmail.EmailBody.split('<p></p>').join('');

        this.corporateActionService.sendCorpActionEmail(this.corporateActionEmail)
         .subscribe(
            values => {
                console.log('success');  
                this.submitting = false; 
                this.notificationService.success("Email is sent", "New corporate action email sent successfully.");                        
            },
            error => {
                console.log(error);
                this.submitting = false;
                this.errorMessage = error;
         });
    }

public options = {
    timeOut: 2000,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: false,
    pauseOnHover: true,
    animate: 'fromRight',
    position: ['bootom', 'left']
  };

    onDestroy(event) {    
        this.router.navigateByUrl('/corporateaction/list');
    }
}
