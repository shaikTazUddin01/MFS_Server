import { model, Schema } from "mongoose";
import { IWithdrawRequest } from "./withdrawRequest.interface";

const WithdrawRequestSchema = new Schema<IWithdrawRequest>(
  {
    agentId: {
      type: Schema.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    requestStatus: {
      type: String,
      enum: ["Pending", "Accept", "Reject"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WithdrawRequest = model<IWithdrawRequest>(
  "WithdrawRequest",
  WithdrawRequestSchema
);
