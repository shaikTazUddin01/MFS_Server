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
const getRechargeRequest = async () => {
 
  const res = await RechargeRequest.find();
  return res;
};


export const RechargeRequestService={
    createRechargeRequest,
    getRechargeRequest
}