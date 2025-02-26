import { IWithdrawRequest } from "./withdrawRequest.interface";
import { WithdrawRequest } from "./withdrawRequest.model";


const createWithDrawRequest = async (data: IWithdrawRequest) => {
  const requestData = {
    agentId: data?.agentId,
    amount:data?.amount,
    requestStatus: "Pending",
  };
  const res = await WithdrawRequest.create(requestData);
  return res;
};


export const WithdrawRequestService={
    createWithDrawRequest
}