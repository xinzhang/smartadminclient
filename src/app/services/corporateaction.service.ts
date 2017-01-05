import {Injectable} from '@angular/core';
import {Headers, Response, Http, RequestOptions} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import {CorporateActionModel} from '../models/corporateactions.model';

@Injectable()
export class CorporateActionService {
    constructor (private http: Http){

    }

    corpActionUrl:string = '/api/corporateaction';

    getReference():Observable<any> {
        var url:string = this.corpActionUrl + "/reference";
        return this.http.get(url).map( data => data.json());
    }

    addCorpAction(corpAction : CorporateActionModel) : Observable<any> {

        let data = JSON.stringify(corpAction);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.corpActionUrl, data, options)
            //.map( resp => resp.json())
            .catch(this.handleError);
    }

    listCorpActions() : Observable<any> {        
        return this.http.get(this.corpActionUrl)
            .map( res => res.json())
            .catch(this.handleError);
    }

    getCorpActionDetail(reference:string) : Observable<any> {        
        return this.http.get(this.corpActionUrl + "/detail/" + reference)
            .map( res => res.json())
            .catch(this.handleError);
    }

    getCorpActionDocuments(reference:string) : Observable<any> {        
        return this.http.get(this.corpActionUrl + "/document/" + reference)
            .map( res => res.json())
            .catch(this.handleError);
    }

    getCorpActionComments(responseID:number) : Observable<any> {        
        return this.http.get(this.corpActionUrl + "/comment/" + responseID)
            .map( res => res.json())
            .catch(this.handleError);
    }

    addCorpActionComments(responseID:number, comment:string) : Observable<any> {

        let data = JSON.stringify(comment);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.corpActionUrl+"/comment/" + responseID, comment, options)
            .map( resp => resp.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.statusText || 'Server error');
    }
    
}