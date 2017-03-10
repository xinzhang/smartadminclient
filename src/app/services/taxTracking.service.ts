import {Injectable} from '@angular/core';
import {Headers, Response, Http, RequestOptions} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import {TaxClient} from '../models/taxClient.model';

@Injectable()
export class TaxTrackingService {
    constructor(private http: Http){

    }

    clientUrl:string = '/api/tax/clients';

    getClients():Observable<TaxClient[]>{
        return this.http.get(this.clientUrl).map(data => data.json());
    }

    saveClient(client:TaxClient):Observable<any> {
        let data = JSON.stringify(client);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.clientUrl, data, options)
            .catch(this.handleError);
    }
    
    handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.statusText || 'Server error');
    }
}
