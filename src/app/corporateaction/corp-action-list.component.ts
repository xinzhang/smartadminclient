import {Component, OnInit} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';
import {CorporateActionService} from '../services/corporateaction.service';

import {Animations} from '../shared/animations';

@Component({
  selector: 'corp-action-list',    
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-list.component.html',
  host: { '[@routeAnimation]': 'true' },  
  animations: Animations.page  
})
export class CorpActionListComponent{

    constructor(private corporateActionService:CorporateActionService){
    }    
}