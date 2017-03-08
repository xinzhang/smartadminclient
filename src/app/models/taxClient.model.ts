
import {TaxContact} from './taxContact.model';

export class TaxClient {
    public Contacts : TaxContact[] = [];
    public TemplateTypes: string[] = [];

    constructor(
        public TaxClientID : number, 
        public ClientCode: string,       
        public ClientName: string,
        public TemplateTypesInt: number,
        public ReportChannel: string      
    ){        
    }
} 