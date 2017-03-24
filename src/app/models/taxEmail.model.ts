
export class TaxEmail {

    constructor(
        public TemplateName:string,
        public ClientCode:string,
        public EmailType : string, 
        public EmailFrom: string,       
        public EmailTo: string,
        public EmailCC: string,
        public Subject: string,
        public EmailBody: string
    ){        
    }
} 