
export class TransferDetailModel {

    constructor(

        //Detail
        public SubType: string,
        public Asset: string,
        public QtyInstructed: number,
        public RecDate: string,
        public TransferReference: string,
        //Confirm
        public QtyConfirmed: number,
        public DateConfirmed: string,
        public UnitPrice:number,
        public Status:string
    ){
    }
} 