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

    addCorpAction(corpAction : CorporateActionModel) : Observable<any> {

        let data = JSON.stringify(corpAction);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.corpActionUrl, data, options)
            .map( resp => resp.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}