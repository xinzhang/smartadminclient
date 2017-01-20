
export class CorporateActionEmailModel {
    public EmailTo : string[] = [];
    public EmailCC : string[] = [];
    public EmailBCC : string[] = [];
    public Documents: string = "";

    public CreatedDate : Date = new Date();

    constructor(
        public Reference : string,
        public EmailFrom : string, 
        public Subject: string,       
        public EmailBody: string        
    ){        
    }
} 
