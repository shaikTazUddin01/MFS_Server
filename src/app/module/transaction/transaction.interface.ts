export interface ITransaction {
    senderNumber:number;
    receiverNumber:number;
    transactionType:"cashIn"|"cashOut"|"sendMoney"|"AddMoney";
    transactionId: string;
    transactionAmount: number;
    password?:string;
  }
  