export interface ITransaction {
    senderNumber:number;
    receiverNumber:number;
    transactionType:"cashIn"|"cashOut"|"sendMoney"|"AddMoney"|"WithDraw";
    transactionId: string;
    transactionAmount: number;
    password?:string;
  }
  