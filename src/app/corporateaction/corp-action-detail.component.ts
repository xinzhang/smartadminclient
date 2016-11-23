import {Component, OnInit} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';
import {CorporateActionService} from '../services/corporateaction.service';

@Component({
  selector: 'corp-action-detail',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-detail.component.html'
})
export class CorpActionDetailComponent{
    constructor(private corporateActionService:CorporateActionService){

    }
    
}