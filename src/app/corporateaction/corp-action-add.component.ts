import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';

import {CorporateActionService} from '../services/corporateaction.service';
import {StaticDataService} from '../services/staticdata.service';

import {Animations} from '../shared/animations';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

import {UploaderComponent} from '../shared/uploader/uploader.component';

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
    currentAPIRLabel = "";

    eventTypes = [];
    
    corporateAction = new CorporateActionModel("", "", "", "", "", "");

    @ViewChild('issuerCodeInput') issuerCodeInput;
    @ViewChild('apirCodeInput') apirCodeInput;

    ajaxIssuerAutocompleteOptions = {        
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
                  label: item.Code + " - " + item.Name,
                  value: item.Code,
                  name: item.Name
                }
              })
              );
            }
          });
        },
        minLength: 2,
        select: (event, ui) => {
          console.log("Selected: ");
          console.log(ui.item);
          this.corporateAction.IssuerCode = ui.item.value;
          this.corporateAction.IssuerName = ui.item.name;          
        }

      };

      ajaxAPIRAutocompleteOptions = {        
        source: (request, response) => {
          var lookupValue:string = this.apirCodeInput.nativeElement.value;

          jQuery.ajax({
            url: "/api/asset/" + lookupValue,
            method: "GET",
            success: (data) => {
              console.log('returned values:');
              console.log(data);
              response($.map(data, function(item){
                return {
                  label: item.Code + " - " + item.Name,
                  value: item.Code,
                  name: item.Name
                }
              })
              );
            }
          });
        },
        minLength: 2,
        select: (event, ui) => {
          console.log("Selected: ");
          console.log(ui.item);
          this.currentAPIR = ui.item.value;  
          this.currentAPIRLabel = ui.item.value + " - " + ui.item.name;        
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
        this.corporateAction.APIRLabels.push(this.currentAPIRLabel);
        this.currentAPIR = "";
        this.currentAPIRLabel = "";
      }
    }

    removeAPIR(val:any) {
      let index = this.corporateAction.APIRCodes.indexOf(val);
      this.corporateAction.APIRCodes.splice(index, 1);
      this.corporateAction.APIRLabels.splice(index, 1);
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

    submitCorporateAction() {
        console.log('service add');
        console.log(this.corporateAction);

      this.corporateActionService.addCorpAction(this.corporateAction)
        .subscribe(
            values => console.log('success'),
            error => console.log(error) 
          )
    }

    removeDocument(idx : number) {
      this.corporateAction.Documents.splice(idx, 1);
    }

}