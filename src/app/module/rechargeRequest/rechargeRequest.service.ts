import { IRechargeRequest } from "./rechargeRequest.interface";
import { RechargeRequest } from "./rechargeRequest.model";

const createRechargeRequest = async (data: IRechargeRequest) => {
  const requestData = {
    agentId: data?.agentId,
    requestStatus: "Pending",
  };
  const res = await RechargeRequest.create(requestData);
  return res;
};


export const RechargeRequestService={
    createRechargeRequest
}