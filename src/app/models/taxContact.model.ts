
export class TaxContact {

    constructor(
        public TaxContactID : number, 
        public Name: string,       
        public WorkPhone: string,
        public Fax: string,
        public Email: string,
        public IsAllowedCommunication: boolean,
        public IsPrimaryContact: boolean        
    ){        
    }
} 