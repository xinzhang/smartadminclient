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
export class CorpActionOfflineListComponent implements OnInit{

    constructor(private corporateActionService:CorporateActionService,
                private localStorageService: LocalStorageService
                ){
                
    }

    public offlineCorpActionList : Array<CorporateActionModel> = new Array<CorporateActionModel>();

    ngOnInit() {
         this.loadOfflineCorporateAction();
    } 

    loadOfflineCorporateAction() {

      if (this.localStorageService.get("offline-corporateAction") != null) {
        this.offlineCorpActionList = JSON.parse(this.localStorageService.get("offline-corporateAction").toString());
      }     

      console.log(this.offlineCorpActionList);
    }

    removeFromOffline(reference) {
        let idx :number = this.offlineCorpActionList.findIndex(x => x.Reference == reference);
        if (idx > -1) {
            this.offlineCorpActionList.splice(idx, 1);
        }
        this.localStorageService.set("offline-corporateAction",JSON.stringify(this.loadOfflineCorporateAction) );
    } 

}