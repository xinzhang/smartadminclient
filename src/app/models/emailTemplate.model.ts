
export class EmailTemplate {

    constructor(
        public TemplateName : string, 
        public EmailFrom: string,       
        public EmailCC: string,
        public Subject: string,
        public EmailBody: string
    ){        
    }
} 
