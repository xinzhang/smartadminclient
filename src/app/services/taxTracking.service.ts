import {Injectable} from '@angular/core';
import {Headers, Response, Http} from '@angular/http';
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
    
}
