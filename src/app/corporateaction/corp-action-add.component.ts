import {Component, OnInit, ElementRef} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';

import {CorporateActionService} from '../services/corporateaction.service';
import {StaticDataService} from '../services/staticdata.service';

import {Animations} from '../shared/animations';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'corp-action-add',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],
  templateUrl: './corp-action-add.component.html',
  host: { '[@routeAnimation]': 'true' },

  animations: Animations.page  
})
export class CorpActionAddComponent implements OnInit{
    numberOfDaysToDue = 14;
    currentAPIR = "";

    eventTypes = [];
    
    formIssuerCode:Control;

    corporateAction = new CorporateActionModel(new Date(), "", "", "", "");

    ajaxAutocompleteOptions = {

        source: (request, response) => {
          console.log("form issuer code" + this.formIssuerCode.value);

          jQuery.ajax({
            url: "/api/issuer/" + this.corporateAction.issuerCode,
            method: "GET",
            //dataType: "jsonp",
            success: (data) => {
              response(data);
            }
          });
        },
        minLength: 2,
        select: (event, ui) => {
          console.log("Selected: " + ui.item.Code + " name: " + ui.item.Name);
          this.corporateaction.IssuerName = ui.item.Name;
        }
      };

    constructor(private corporateActionService: CorporateActionService, private staticDataService: StaticDataService, myElement: ElementRef) {                  
      this.corporateAction.DueDate = moment().add(7, 'days').format("DD-MM-YYYY");
      this.elementRef = myElement;
    }

    ngOnInit() {
      this.loadEventTypes();
    }

    addAPIR() {      
      if (this.currentAPIR != "") {
        this.corporateAction.APIRCodes.push(this.currentAPIR);
        this.currentAPIR = "";
      }
    }

    removeAPIR(val:any) {
      let index = this.corporateAction.APIRCodes.indexOf(val);
      this.corporateAction.APIRCodes.splice(index, 1);
    }

    loadEventTypes() {
      this.staticDataService.getEventTypes()
        .subscribe(
          values => this.eventTypes = values,
          error => console.log(error)
        )
    }

    public currentAsset = '';
    public assets = [];
    public filteredAssets = [];
    public elementRef;

}