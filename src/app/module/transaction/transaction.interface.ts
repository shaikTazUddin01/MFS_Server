import { Types } from "mongoose";

export interface ITransaction {
    senderId:Types.ObjectId;
    receiverId:Types.ObjectId;
    transactionType:"cashIn"|"cashOut";
    transactionId: string;
    transactionAmount: number;
  }
  