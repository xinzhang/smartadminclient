import {Component} from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

import {Animations} from '../shared/animations';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
} 

@Component({
    selector: 'sharepoint-docs',    
    styleUrls: ['./corp-action.component.css'],
    template: `
    <div class="container">
        <div class="row">  
            <h3>&nbsp;</h3>    
        </div>

        <div class="row">
            <div class="alert alert-info">
                The documents uploaded in sharepoint can be viewed here, {{url}}
            </div>
        </div>

        <div class="row">
            <iframe width="100%" height="100%" [src]="url | safe"></iframe>
        </div>
    </div>
    `,
    host: { '[@routeAnimation]': 'true' },  
    animations: Animations.page
})
export class SharePointDocumentsComponent {

    url : string = "http://amdevsp01:8085/Lists/ClientPortalDocuments/Forms/CorpAction.aspx";

}

