import { Types } from "mongoose";

export interface IRechargeRequest {
  id?: Types.ObjectId;
  agentId: Types.ObjectId;
  requestStatus: "Pending" | "Accept" | "Reject";
}
