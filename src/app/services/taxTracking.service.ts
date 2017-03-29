import {Injectable} from '@angular/core';
import {Headers, Response, Http, RequestOptions} from '@angular/http';
import 'rxjs';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { TaxClient } from '../models/taxClient.model';
import { TaxEmail } from '../models/taxEmail.model';

@Injectable()
export class TaxTrackingService {

    clientUrl:string = '/api/tax/clients'
    reportUrl:string = '/api/tax/reports'
    taxTemplateUrl:string = '/api/tax/templates'    
    emailUrl:string = '/api/tax/emails'

    constructor(private http: Http){

    }
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

    getCurrentReports():Observable<any> {
        return this.http.get(this.reportUrl).map(data => data.json());
    }

    downloadCurrentTaxReport(clientCode):Observable<any> {
        return this.http.get(this.reportUrl + "/download/tax/" + clientCode).map(data => data.json());
    }

    downloadCurrentDistributionReport(clientCode):Observable<any> {
        return this.http.get(this.reportUrl + "/download/distribution/" + clientCode).map(data => data.json());
    }

    getCurrentTaxReport(clientCode):Observable<any> {
        return this.http.get(this.reportUrl + "/view/tax/" + clientCode).map(data => data.json());
    }

    getCurrentDistributionReport(clientCode):Observable<any> {
        return this.http.get(this.reportUrl + "/view/distribution/" + clientCode).map(data => data.json());
    }

    getEmailTemplate(emailType, clientCode):Observable<any> {
        return this.http.get(this.emailUrl + "/" + emailType + "/" + clientCode).map(data => data.json());
    }

    sendTaxEmail(taxEmail: TaxEmail):Observable<any> {
        let data = JSON.stringify(taxEmail);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.emailUrl, data, options)
            .catch(this.handleError);
    }

    getTemplates():Observable<any> {
        return this.http.get(this.taxTemplateUrl).map(data => data.json());   
    }

    saveTemplate(template):Observable<any> {
        let data = JSON.stringify(template);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post(this.taxTemplateUrl, data, options)
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.statusText || 'Server error');
    }
}
