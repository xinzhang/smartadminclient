import {Injectable} from '@angular/core';
import {Headers, Response, Http} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class StaticDataService {
    constructor (private http: Http){

    }

    eventTypesUrl:string = '/api/eventtypes';
    assetUrl:string = '/api/asset'
    issuerUrl:string = '/api/issuer'

    getEventTypes():Observable<string[]> {
        return this.http.get(this.eventTypesUrl).map( data => data.json());
    }

    addEventTypes(evt:string) : Observable<number> {
        var url:string = this.eventTypesUrl+ "?evt=" + evt;
        return this.http.post(url, null, null).map(val => val.status).catch(error => Observable.throw(error.json()));
    }

    deletedEventTypes(evt:string): Observable<number> {
        var url:string = this.eventTypesUrl+ "?evt=" + evt;
        return this.http.delete(url, null).map(val => val.status);
    }

    getIssuers():Observable<any> {
        return this.http.get(this.issuerUrl).map( data => data.json());
    }

    searchIssuers(search:string):Observable<any> {
        var url:string = this.issuerUrl+ "/" + search;
        return this.http.get(url).map( data => data.json());
    }

    getAssets():Observable<any> {
        return this.http.get(this.assetUrl).map( data => data.json());
    }

    searchAssets(search:string):Observable<any> {
        var url:string = this.assetUrl+ "/" + search;
        return this.http.get(url).map( data => data.json());
    }

}
