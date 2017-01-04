
import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {CorporateActionModel} from '../models/corporateactions.model';
import {CorporateActionService} from '../services/corporateaction.service';

@Component({
  selector: 'corp-action-detail',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-detail.component.html'
})
export class CorpActionDetailComponent implements OnInit{

    corporatActionDetail:any;

    constructor(private corporateActionService:CorporateActionService,
        private route: ActivatedRoute){          
    }

    ngOnInit() {
        let reference = this.route.snapshot.params["reference"];
        if (reference != null) {
          this.corporateActionService.getCorpActionDetail(reference).subscribe( x=> this.corporatActionDetail = x);
        }
    }

}