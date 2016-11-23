import {Component, OnInit} from '@angular/core'
import {StaticDataService} from '../services/staticdata.service'

import 'rxjs';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {Animations} from '../shared/animations';

@Component({
    selector: 'asset-search',
    templateUrl: './asset.component.html',    
    styleUrls:['./common.component.css'],
    providers: [StaticDataService],
    host: { '[@routeAnimation]': 'true' },  
    animations: Animations.page    
})
export class AssetComponent implements OnInit{
    assets: Observable<any>;
    private searchTerms = new Subject<string>();

    constructor(private staticDataService:StaticDataService){
    }

    search(term: string): void {
        this.searchTerms.next(term)
    }

    ngOnInit(): void {
        this.assets = this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => term 
                ? this.staticDataService.searchAssets(term)
                : Observable.of<any>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<any>([]);
            })
    }

}