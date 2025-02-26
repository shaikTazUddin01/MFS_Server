import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { Auth } from "../Auth/auth.model";
import { IRechargeRequest } from "./rechargeRequest.interface";
import { RechargeRequest } from "./rechargeRequest.model";
import { Transaction } from "../transaction/transaction.model";

const createRechargeRequest = async (data: IRechargeRequest) => {
  const requestData = {
    agentId: data?.agentId,
    requestStatus: "Pending",
  };
  const res = await RechargeRequest.create(requestData);
  return res;
};

const getRechargeRequest = async () => {
  const res = await RechargeRequest.find().populate("agentId");
  return res;
};

const addMoneyToAgent = async (data: IRechargeRequest) => {
  if (data?.requestStatus == "Reject") {
    await RechargeRequest.deleteOne({ _id: data?.id });
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

  const agentNewBalance = (isAgentExists.balance ?? 0) + 100000;

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

  const adminNewBalance = (isAdminExists.balance ?? 0) - 100000;

  await Auth.findOneAndUpdate({ role: "Admin" }, { balance: adminNewBalance });

  // create transaction id
  const currentDateTime = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const transactionId = `trns-${currentDateTime}${randomNumber}$100000`;

  const transactionData = {
    senderNumber: isAdminExists?.number,
    receiverNumber: isAgentExists?.number,
    transactionType: "AddMoney",
    transactionId: transactionId,
    transactionAmount: "100000",
  };
  // create new transaction
  await Transaction.create(transactionData);

  await RechargeRequest.deleteOne({ _id: data?.id });
  return "Request Accepted";
};

export const RechargeRequestService = {
  createRechargeRequest,
  getRechargeRequest,
  addMoneyToAgent,
};
