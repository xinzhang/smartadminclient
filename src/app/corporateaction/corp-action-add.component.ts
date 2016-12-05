import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CorporateActionModel} from '../models/corporateactions.model';

import {CorporateActionService} from '../services/corporateaction.service';
import {StaticDataService} from '../services/staticdata.service';

import {Animations} from '../shared/animations';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

import {UploaderComponent} from '../shared/uploader/uploader.component';

import { LocalStorageService } from 'angular-2-local-storage';

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
    selectedClientCode = "";

    eventTypes = [];
    clientCodes = [];
    
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
              //also can limit number here
              var selection = data.slice(0,15);
              if (data.length > 15) {
                selection.push({"Code":"(More...)", "Name":""});
              }          
              response($.map(selection, function(item){
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
          this.currentAPIR = ui.item.value;  
          this.currentAPIRLabel = ui.item.value + " - " + ui.item.name;        
        }
      };

    constructor(private corporateActionService: CorporateActionService, 
                private staticDataService: StaticDataService,
                private localStorageService: LocalStorageService, 
                myElement: ElementRef) {                  
      this.corporateAction.DueDate = moment().add(7, 'days').format("DD-MM-YYYY");
      this.elementRef = myElement;
    }

    ngOnInit() {
      this.getReference();
      this.loadLookupData();            
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

    loadLookupData() {
      this.staticDataService.getEventTypes()
        .subscribe(
          values => this.eventTypes = values,
          error => console.log(error)
        );
      this.staticDataService.getPortalClient()
        .subscribe(
          values => this.clientCodes = values,
          error => console.log(error)
        )
    }

    getReference() {
      this.corporateActionService.getReference()
        .subscribe(
          val => this.corporateAction.Reference = val,
          error => console.log(error)
        );
    }

    setClientCode($event:any) {
      this.corporateAction.ClientCodes = [];
      this.corporateAction.ClientCodes.push($event.target.value);
    }

    public currentAsset = '';
    public assets = [];
    public filteredAssets = [];
    public elementRef;

    submitCorporateAction() {

      this.corporateActionService.addCorpAction(this.corporateAction)
        .subscribe(
            values => console.log('success'),
            error => console.log(error) 
          )
    }

    removeDocument(idx : number) {
      this.corporateAction.Documents.splice(idx, 1);
    }

    saveDraftCorporateAction() {
      let corpactions = new Array<CorporateActionModel>();
      if (this.localStorageService.get("offline-corporateAction") != null) {
        corpactions = JSON.parse(this.localStorageService.get("offline-corporateAction").toString());
      }     
      
      console.log(this.corporateAction);

      let idx = corpactions.findIndex(x => x.Reference == this.corporateAction.Reference);
      console.log(idx);

      if (idx >= 0) {
        corpactions[idx] = this.corporateAction;
      }
      else {
        corpactions.push(this.corporateAction);
      }

      this.localStorageService.set("offline-corporateAction",JSON.stringify(corpactions) );
    }
    
}
