import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CorporateActionModel} from '../models/corporateactions.model';
import {CorporateActionService} from '../services/corporateaction.service';

@Component({
  selector: 'corp-action-confirm',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  template: `
    <div class="container">
        <h3>&nbsp;</h3>
        <div class="row">
            <h3>Your corporate action has been submitted sucessfully with Reference {{reference}}</h3>
        </div>
    </div>
  `
})
export class CorpActionConfirmComponent implements OnInit{
    constructor(private corporateActionService:CorporateActionService,
                private route: ActivatedRoute){   
        this.reference = this.route.snapshot.params["reference"];     
    }
    
    reference:string = "";

    ngOnInit() {        
    }
    
}