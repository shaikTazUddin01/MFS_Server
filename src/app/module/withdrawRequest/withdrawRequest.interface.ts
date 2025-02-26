import { Types } from "mongoose";

export interface IWithdrawRequest {
    agentId:Types.ObjectId;
    amount:number;
    requestStatus:"Pending"|"Accept"|"Reject";
  }
  