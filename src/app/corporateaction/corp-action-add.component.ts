import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';

import {CorporateActionService} from '../services/corporateaction.service';
import {StaticDataService} from '../services/staticdata.service';

import {Animations} from '../shared/animations';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

declare var $:any;

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
    
    corporateAction = new CorporateActionModel("", "", "", "", "");
    @ViewChild('issuerCodeInput') issuerCodeInput;

    ajaxAutocompleteOptions = {        
        source: (request, response) => {
          var lookupValue:string = this.issuerCodeInput.nativeElement.value;

          jQuery.ajax({
            url: "/api/issuer/" + lookupValue,
            method: "GET",
            success: (data) => {
              console.log('returned values:');
              console.log(data);
              response($.map(data, function(item){
                return {
                  label: item.Code,
                  value: item.Name
                }
              })
              );
            }
          });
        },
        minLength: 2,
        select: (event, ui) => {
          //console.log("Selected: " + ui.item.label + " name: " + ui.item.value);
          this.corporateAction.IssuerName = ui.item.value;
        }
      };

    constructor(private corporateActionService: CorporateActionService, private staticDataService: StaticDataService, myElement: ElementRef) {                  
      this.corporateAction.DueDate = moment().add(7, 'days').format("DD-MM-YYYY");
      this.elementRef = myElement;
    }

    ngOnInit() {
      this.loadEventTypes();
      console.log('started');
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