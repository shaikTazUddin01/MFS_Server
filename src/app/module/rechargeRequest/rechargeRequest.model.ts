import { model, Schema } from "mongoose";
import { IRechargeRequest } from "./rechargeRequest.interface.js";

const rechargeRequestSchema = new Schema<IRechargeRequest>(
  {
    agentId: {
      type: Schema.ObjectId,
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

export const RechargeRequest = model<IRechargeRequest>(
  "RechargeRequest",
  rechargeRequestSchema
);
