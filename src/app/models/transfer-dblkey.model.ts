
import {TransferDetailModel} from './transfer-detail.model';

export class TransferDblKeyModel {
    public TransferDetails : TransferDetailModel[] = [];    
    constructor(
        //Request
        public SequenceID : string,
        public Organisation : string, 
        public Investor: number,    
        public InvestorName: string,
        public InvestorId: string,
        public RequestType: string,
        public ReceivedDate: string,
        public Transferee: string,
        public Group: string,
        public Ncbo: boolean,               
    ){        
    }
} 