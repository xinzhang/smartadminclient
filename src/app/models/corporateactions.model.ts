
export class CorporateActionModel {
    public APIRCodes : string[] = [];
    public APIRLabels: string[] = [];

    public Documents: string[] = [];
    public ClientCodes: string[] = [];

    public Reference: string = "";

    public CreatedDate : Date = new Date();

    constructor(
        public DueDate : string,        
        public IssuerCode: string,
        public IssuerName: string,
        public EventType: string,
        public Subject: string,
        public Description: string        
    ){        
    }
} 