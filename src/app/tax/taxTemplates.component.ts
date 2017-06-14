import {Component, OnDestroy, Input, Output, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { TaxTrackingService } from '../services/taxTracking.service';
import {EmailTemplate} from '../models/emailTemplate.model';

//TN
import { Animations } from '../shared/animations';

declare var $: any;

@Component({
    selector: 'tax-templates',
    styleUrls: ['./tax.component.css'],
    providers: [TaxTrackingService],
    templateUrl: './taxTemplates.component.html',
    //TN
    host: { '[@routeAnimation]': 'true' },
    animations: Animations.page, 
})
export class TaxTemplatesComponent implements OnInit {

    emailTemplates : EmailTemplate[] = [];
    selectedTemplate: EmailTemplate = new EmailTemplate("","","","","");

    @ViewChild('summernote') summernote: any;

    constructor(private taxTrackingService: TaxTrackingService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.taxTrackingService.getTemplates()
            .subscribe(
                x => this.emailTemplates = x
            );
    }

    setTemplate($event: any) {        
        this.selectedTemplate = this.emailTemplates.find(x => x.TemplateName === $event.target.value);        
        //$(this.summernote.nativeElement).summernote('editor.pasteHTML', this.selectedTemplate.EmailBody);
    }

    emailBodyChanged($event:any) {        
        var body = $event.value.split('\n').join('<br />');
        this.selectedTemplate.EmailBody = body;
    }

    submitting = false;

    submit() {
        //this.selectedTemplate.EmailBody = this.selectedTemplate.EmailBody.split('<p></p>').join('');
        
        this.submitting = true;
        this.taxTrackingService.saveTemplate(this.selectedTemplate)
            .subscribe(x => {
                this.submitting = false;
            });        
    }

    
  onSubmit(f) {    
    this.submitting = true;
    this.taxTrackingService.saveTemplate(this.selectedTemplate)
        .subscribe(x => {
            this.submitting = false;
        });        
  }

}