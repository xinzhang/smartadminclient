import {Component, OnInit} from '@angular/core'
import {StaticDataService} from '../services/staticdata.service'
import {Animations} from '../shared/animations';

@Component({
    templateUrl: './eventtypes.component.html',
    selector: 'Event-Types',
    providers: [StaticDataService],
    host: { '[@routeAnimation]': 'true' },  
    animations: Animations.page    
})
export class EventTypesComponent implements OnInit {
    private currentEventType:string = "";
    private eventTypes : string[] = [];
    private errorMessage: string = "";

    constructor(private staticDataService: StaticDataService){
        this.staticDataService.getEventTypes().subscribe()

    }

    ngOnInit() {
      this.loadEventTypes();
    }

    addEventType() {        
        this.staticDataService.addEventTypes(this.currentEventType).subscribe(
            values => {
                this.eventTypes.push(this.currentEventType);
                this.currentEventType = "";
            },
            error => {
                //console.log(JSON.stringify(<any>error));
                this.errorMessage = error.Message;
            }
        );
    }

    removeEventType(evt:string) {        
        this.staticDataService.deletedEventTypes(evt).subscribe(
            values => {
                let idx = this.eventTypes.indexOf(evt);
                this.eventTypes.splice(idx, 1);
                this.currentEventType = "";
            },
            error => console.log("error:" + error)
        );
    }

    loadEventTypes() {
      this.staticDataService.getEventTypes()
        .subscribe(
          values => this.eventTypes = values,
          error => console.log("error:" + error)
        )
    } 

}