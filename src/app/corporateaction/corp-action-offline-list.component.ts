import {Component, OnInit} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';
import {CorporateActionService} from '../services/corporateaction.service';

import {Animations} from '../shared/animations';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'corp-action-offline-list',    
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-offline-list.component.html',
  host: { '[@routeAnimation]': 'true' },  
  animations: Animations.page  
})
export class CorpActionOfflineListComponent{

    constructor(private corporateActionService:CorporateActionService,
                private localStorageService: LocalStorageService
                ){
    }

    loadOfflineCorporateAction() {
      this.localStorageService.get("corporateAction");
      //this.localStorageService.add("corporateAction",JSON.stringify(this.corporateAction) );
    } 

}