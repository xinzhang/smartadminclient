import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CorporateActionModel } from '../models/corporateactions.model';

import { CorporateActionService } from '../services/corporateaction.service';
import { StaticDataService } from '../services/staticdata.service';

import { Animations } from '../shared/animations';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

import { UploaderComponent } from '../shared/uploader/uploader.component';

import { LocalStorageService } from 'angular-2-local-storage';

import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { NotificationsService, SimpleNotificationsComponent } from 'angular2-notifications';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
//import 'rxjs/add/operator/map';

declare var $: any;

@Component({
  selector: 'corp-action-add',
  styleUrls: ['./corp-action.component.css'],
  providers: [CorporateActionService],  
  templateUrl: './corp-action-add.component.html',
  host: { '[@routeAnimation]': 'true' },
  animations: Animations.page  
})
export class CorpActionAddComponent implements OnInit, OnDestroy {

  //configuration
  editMode:boolean = false;
  
  numberOfDaysToDue = 14;
  subscription: Subscription;

  currentAPIR = "";
  currentAPIRLabel = "";
  selectedClientCode = "";

  eventTypes = [];
  clientCodes = [];

  multipleSelectAPIRFrom: any[] = [];
  // searchTerms = new Subject<string>();
  observableAssets: Observable<any>;
  private searchTerms = new Subject<string>();

  multipleSelectAPIRTo: any[] = [];

  corporateAction = new CorporateActionModel("", "", "", "", "", "");
  errorMessage: string = "";

  @ViewChild('issuerCodeInput') issuerCodeInput;
  @ViewChild('apirCodeInput') apirCodeInput;
  @ViewChild('multiSelectAPIRInputLeft') multiSelectAPIRInputLeft;
  @ViewChild('multiSelectAPIRInputRight') multiSelectAPIRInputRight;

  @ViewChild('fileUploader') fileUploader;
  @ViewChild('modal') modal: ModalComponent;
  @ViewChild('summernote') summernote: any;

  ajaxIssuerAutocompleteOptions = {
    source: (request, response) => {
      var lookupValue: string = this.issuerCodeInput.nativeElement.value;

      jQuery.ajax({
        url: "/api/issuer/" + lookupValue,
        method: "GET",
        success: (data) => {
          response($.map(data, function (item) {
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
      var lookupValue: string = this.apirCodeInput.nativeElement.value;

      jQuery.ajax({
        url: "/api/asset/" + lookupValue,
        method: "GET",
        success: (data) => {
          //also can limit number here
          var selection = data.slice(0, 15);
          if (data.length > 15) {
            selection.push({ "Code": "(More...)", "Name": "" });
          }
          response($.map(selection, function (item) {
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
      this.currentAPIRLabel = ui.item.name;
    }
  };

  constructor(private corporateActionService: CorporateActionService,
    private staticDataService: StaticDataService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationsService,
    myElement: ElementRef) {
    this.corporateAction.DueDate = moment().add(7, 'days').format("DD/MM/YYYY");
    this.elementRef = myElement;
  }

  search(term: string): void {
    console.log(term);
    //this.searchTerms.next(term)
    this.staticDataService.searchAssets(term)
      .subscribe(data => this.multipleSelectAPIRFrom = data);
  }

  ngOnInit() {
    this.loadLookupData();

    //user offline
    let offlineReference = this.route.snapshot.params["offlineReference"];
    if (offlineReference != null) {
      this.getCorpActionFromOffline(offlineReference);
    } 

    //user reference for detail
    let reference = this.route.snapshot.params["refno"];
    if (reference != null) {
      this.editMode = true; 
      this.getCorpActionByReference(reference);
    } 

    if (offlineReference == null && reference == null ) {
      this.getReference();
    }

    //triggered after two minutes when user really start working on it
    let timer = TimerObservable.create(120 * 1000, 1000 * 30);
    this.subscription = timer.subscribe(t => {
      //Todo: add validation to see if really need to automatically save.
      //      there is no need to save everything right way.
      this.saveDraftCorporateAction();
    });
  }

  ngAfterViewInit() {
    // Component views are initialized
    this.corporateAction.Description = "ACE";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addAPIR() {
    if (this.currentAPIR != "") {
      this.corporateAction.APIRCodes.push(this.currentAPIR);
      this.corporateAction.APIRLabels.push(this.currentAPIRLabel);
      this.currentAPIR = "";
      this.currentAPIRLabel = "";
    }
  }

  removeAPIR(val: any) {
    let index = this.corporateAction.APIRCodes.indexOf(val);
    this.corporateAction.APIRCodes.splice(index, 1);
    this.corporateAction.APIRLabels.splice(index, 1);
  }

  loadLookupData() {
    this.staticDataService.getEventTypes()
      .subscribe(
      values => {
        this.eventTypes = values
      },
      error => console.log(error)
      );
    this.staticDataService.getPortalClient()
      .subscribe(
      values => {
        this.clientCodes = values;
        if (values.length > 0) {
          this.corporateAction.ClientCodes[0] = values[0];
        }
      },
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

  setClientCode($event: any) {
    this.corporateAction.ClientCodes = [];
    this.corporateAction.ClientCodes.push($event.target.value);
  }

  dueDateChanged($event: any) {
    this.corporateAction.DueDate = $event.value;        
  }

  public currentAsset = '';
  public assets = [];
  public filteredAssets = [];
  public elementRef;

  submitting = false;
  inProgress = false;

  onSubmit(f) {
    
    this.submitting = true;

    //check the scenario that no documents (because edit doesn't allow it yet.)
    if (this.fileUploader != null) {
    this.corporateAction.Documents = this.fileUploader.GetDocuments();
    }
    this.corporateActionService.addCorpAction(this.corporateAction)
      .subscribe(
      values => {
        console.log('success');        
        this.deleteDraftCorporateAction(this.corporateAction.Reference);
        this.saved();
      },
      error => {
        console.log(error);
        this.submitting = false;
        this.errorMessage = error;
      });
  }

  removeDocument(idx: number) {
    this.corporateAction.Documents.splice(idx, 1);
  }

  saveDraftCorporateAction() {
    this.inProgress = true;
    
    let corpactions = new Array<CorporateActionModel>();

    if (this.localStorageService.get("offline-corporateAction") != null) {
      corpactions = JSON.parse(this.localStorageService.get("offline-corporateAction").toString());
    }

    let idx = corpactions.findIndex(x => x.Reference == this.corporateAction.Reference);
    if (idx >= 0) {
      corpactions[idx] = this.corporateAction;
    }
    else {
      corpactions.push(this.corporateAction);
    }

    //save state of uploader
    this.corporateAction.Documents = this.fileUploader.RemoteDocuments;

    this.localStorageService.set("offline-corporateAction", JSON.stringify(corpactions));

    setTimeout(() => this.inProgress = false, 2000);
  }

  deleteDraftCorporateAction(reference:string) {

    let corpactions = new Array<CorporateActionModel>();

    if (this.localStorageService.get("offline-corporateAction") != null) {
      corpactions = JSON.parse(this.localStorageService.get("offline-corporateAction").toString());
    }

    let idx = corpactions.findIndex(x => x.Reference == this.corporateAction.Reference);
    if (idx >= 0) {
      corpactions.splice(idx, 1);
      this.localStorageService.set("offline-corporateAction", JSON.stringify(corpactions));      
    }

  }

  getCorpActionFromOffline(reference: string) {
    let corpactions = new Array<CorporateActionModel>();
    if (this.localStorageService.get("offline-corporateAction") != null) {
      corpactions = JSON.parse(this.localStorageService.get("offline-corporateAction").toString());
    }

    let idx = corpactions.findIndex(x => x.Reference == reference);
    if (idx >= 0) {
      this.corporateAction = corpactions[idx];
      console.log(this.corporateAction);
    }

  }

  getCorpActionByReference(reference: string) {
    this.corporateActionService.getCorpActionDetail(reference).subscribe( x => {
      this.corporateAction.Reference = x.Reference;
      this.corporateAction.DueDate = x.DueDate;
      this.corporateAction.IssuerCode = x.IssuerCode;      
      this.corporateAction.EventType = x.EventType;
      this.corporateAction.Subject = x.Subject;
      this.corporateAction.Description = x.Description;
      this.summernote.codeText = x.Description;

      this.corporateAction.APIRCodes = x.APIRCodes;
      this.corporateAction.APIRLabels = x.APIRLabels;
      this.staticDataService.searchIssuers(x.IssuerCode).subscribe( y => {
        this.corporateAction.IssuerName = y[0].Name;
      });

    });

  }

  moveSelectionToRight() {
    console.log(this.multiSelectAPIRInputLeft.nativeElement);
    for (let i = 0; i < this.multiSelectAPIRInputLeft.nativeElement.options.length; i++) {
      if (this.multiSelectAPIRInputLeft.nativeElement.options[i].selected) {
        let val = this.multiSelectAPIRInputLeft.nativeElement.options[i].value;
        let valObj = this.multipleSelectAPIRFrom.find(x => x.Code === val);
        if (valObj != null) {
          this.multipleSelectAPIRTo.push(valObj);
        }
      }
    }
    console.log(this.multipleSelectAPIRTo);
  }

  moveSelectionToLeft() {
    console.log(this.multiSelectAPIRInputRight.nativeElement);
    for (let i = 0; i < this.multiSelectAPIRInputRight.nativeElement.options.length; i++) {
      if (this.multiSelectAPIRInputRight.nativeElement.options[i].selected) {
        let val = this.multiSelectAPIRInputRight.nativeElement.options[i].value;
        let obj = this.multipleSelectAPIRTo.find(x => x.Code === val);
        if (obj != null) {
          let idx = this.multipleSelectAPIRTo.indexOf(obj);
          this.multipleSelectAPIRTo.splice(idx, 1);
        }
      }
    }
  }

  addMultiSelectedAPIR() {
    this.multipleSelectAPIRTo.forEach(x => {
      if (this.corporateAction.APIRCodes.indexOf(x.Code) == -1) {
        this.corporateAction.APIRCodes.push(x.Code);
        this.corporateAction.APIRLabels.push(x.Name);
      }
    });

    this.closeDialog();
  }

  closeDialog() {
    this.multipleSelectAPIRFrom = [];
    this.multipleSelectAPIRTo = [];
    this.modal.close();    
  }

  descriptionChanged(event) {
    this.corporateAction.Description = event.value;
  }

  filesUpdated(event) {
    this.corporateAction.Documents = event.value;
  }

  public options = {
    timeOut: 2000,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: false,
    pauseOnHover: true,
    animate: 'fromRight',
    position: ['bootom', 'left']
  };

  onDestroy(event) {
    //console.log(event);
    this.router.navigateByUrl('/corporateaction/confirm/' + this.corporateAction.Reference);
  }

  saved() {
    this.notificationService.success("Saved ", "New corporate action created.");
  }

  passwordstr: string;
  confirmPasswordstr: string;
}
