import { model, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    senderNumber: {
      type: Number,
      required: true,
    },
    receiverNumber: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ["cashIn", "cashOut","sendMoney","AddMoney"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    transactionAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
