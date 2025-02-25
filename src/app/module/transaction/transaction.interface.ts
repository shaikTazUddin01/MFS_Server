import { Types } from "mongoose";

export interface ITransaction {
    senderNumber:number;
    receiverNumber:number;
    transactionType:"cashIn"|"cashOut";
    transactionId: string;
    transactionAmount: number;
  }
  