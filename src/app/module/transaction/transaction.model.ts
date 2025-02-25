import { model, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    transactionType: {
      type: String,
      enum: ["cashIn", "cashOut"],
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
