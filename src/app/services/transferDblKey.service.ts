import {Injectable} from '@angular/core';
import {Headers, Response, Http, RequestOptions} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { TransferDblKeyModel } from '../models/transfer-dblkey.model';
import { TransferDetailModel } from '../models/transfer-detail.model';
import { TransferSearchModel } from '../models/transfer-search.model';
 
@Injectable()
export class TransferDblKeyService {
    constructor (private http: Http){
    }

    dblKeyTransferUrl:string = '/api/dblktransfer';

    addTansferDetail(transfer : TransferDblKeyModel) : Observable<any> {

        let data = JSON.stringify(transfer);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.dblKeyTransferUrl, data, options)
            .map( resp => resp.json())
            .catch(this.handleError);
    }

    updateTansferDetail(transfer : TransferDblKeyModel) : Observable<any> {

        let data = JSON.stringify(transfer);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.put(this.dblKeyTransferUrl, data, options)
            .map( resp => resp.json())
            .catch(this.handleError);
    }

    confirmTransferDetail(transfer : TransferDblKeyModel) : Observable<any> {
        let data = JSON.stringify(transfer);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.dblKeyTransferUrl + "/confirm", data, options)
            .map( resp => resp.json())
            .catch(this.handleError);
    }
    
    getTransferSequenceID(org : string) : Observable<string> {
        return this.http.get(this.dblKeyTransferUrl + "/sequenceID/" + org)
            .map(resp => resp.json())
    }

    search(searchItem: TransferSearchModel) : Observable<any> {
        let data = JSON.stringify(searchItem);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.dblKeyTransferUrl + "/search", data, options)
            .map( resp => resp.json())
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.statusText || 'Server error');
    }
    
}