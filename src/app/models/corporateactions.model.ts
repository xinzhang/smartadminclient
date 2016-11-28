
export class CorporateActionModel {
    public APIRCodes : string[] = [];
    public APIRLabels: string[] = [];

    public Documents: string[] = [];

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