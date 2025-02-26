import { Types } from "mongoose";

export interface IWithdrawRequest {
  id?: Types.ObjectId;
  agentId: Types.ObjectId;
  amount: number;
  requestStatus: "Pending" | "Accept" | "Reject";
}
