
import {TaxContact} from './taxContact.model';

export class TaxClient {

    constructor(
        public TaxClientID : number, 
        public ClientCode: string,       
        public ClientName: string,
        public TemplateTypesInt: number,
        public ReportChannel: string,   
        public TemplateTypes: string[],
        public Contacts : TaxContact[]     
    ){
    }
} 