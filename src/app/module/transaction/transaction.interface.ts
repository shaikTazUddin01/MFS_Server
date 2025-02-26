export interface ITransaction {
    senderNumber:number;
    receiverNumber:number;
    transactionType:"cashIn"|"cashOut"|"sendMoney";
    transactionId: string;
    transactionAmount: number;
    password?:string;
  }
  