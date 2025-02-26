import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Auth } from "../Auth/auth.model";
import { IWithdrawRequest } from "./withdrawRequest.interface";
import { WithdrawRequest } from "./withdrawRequest.model";
import { Transaction } from "../transaction/transaction.model";


const createWithDrawRequest = async (data: IWithdrawRequest) => {
  const requestData = {
    agentId: data?.agentId,
    amount:data?.amount,
    requestStatus: "Pending",
  };
  const res = await WithdrawRequest.create(requestData);
  return res;
};
const getDrawRequest = async () => {

  const res = await WithdrawRequest.find().populate("agentId");
  return res;
};


const withDrawRequestResponse = async (data: IWithdrawRequest) => {
  if (data?.requestStatus == "Reject") {
    await WithdrawRequest.deleteOne({ _id: data?.id });
    return "Request Rejected";
  }

  // check agent exists or not
  const isAgentExists = await Auth.findOne({ _id: data?.agentId });

  if (!isAgentExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No Agent Match please select a valid Agent"
    );
  }

  const agentNewBalance = (isAgentExists.balance ?? 0) - data?.amount;

  await Auth.findOneAndUpdate(
    { _id: data?.agentId },
    { balance: agentNewBalance }
  );
  // check admin
  const isAdminExists = await Auth.findOne({ role: "Admin" });

  if (!isAdminExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "someThing is wrong,please try again!"
    );
  }

  const adminNewBalance = (isAdminExists.balance ?? 0) + data?.amount;

  await Auth.findOneAndUpdate({ role: "Admin" }, { balance: adminNewBalance });

  // create transaction id
  const currentDateTime = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const transactionId = `trns-${currentDateTime}${randomNumber}${data?.amount}`;

  const transactionData = {
    senderNumber: isAdminExists?.number,
    receiverNumber: isAgentExists?.number,
    transactionType: "WithDraw",
    transactionId: transactionId,
    transactionAmount: data?.amount,
  };
  // create new transaction
  await Transaction.create(transactionData);

  await WithdrawRequest.deleteOne({ _id: data?.id });
  return "Request Accepted";
};


export const WithdrawRequestService={
    createWithDrawRequest,
    getDrawRequest,
    withDrawRequestResponse

}