import { Types } from "mongoose";

export interface IRechargeRequest {
    agentId:Types.ObjectId;
    requestStatus:"Pending"|"Accept"|"Reject";
  }
  