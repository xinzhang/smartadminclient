import {Injectable} from '@angular/core';
import {Headers, Response, Http} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CorporateActionService {
    constructor (private http: Http){

    }

    eventTypesUrl:string = '/api/corporateaction';

}