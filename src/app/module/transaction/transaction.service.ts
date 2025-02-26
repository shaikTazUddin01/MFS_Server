import { AppError } from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "./transaction.model";
import { ITransaction } from "./transaction.interface";
import { Auth } from "../Auth/auth.model";
import bcrypt from "bcrypt";
// send money transaction
const sendMoneyTransaction = async (data: ITransaction) => {
  const receiverNumber = data?.receiverNumber;
  const senderNumber = data?.senderNumber;
  let transactionAmount = data?.transactionAmount;
  let charged = 0;
  if (transactionAmount > 100) {
    transactionAmount = transactionAmount - 5;
    charged = charged + 5;
  }

  // update admin balance and income
  const isAdminExists = await Auth.findOne({ role: "Admin" });
  if (isAdminExists && isAdminExists.balance) {
    const adminNewBalance = isAdminExists?.balance + charged;
    const adminNewIncome = (isAdminExists.income ?? 0) + charged;

    await Auth.findOneAndUpdate(
      { _id: isAdminExists?._id },
      { balance: adminNewBalance, income: adminNewIncome },
      { new: true }
    );
  }

  // check send money own number or not
  if (receiverNumber === senderNumber) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "You can not send money your own account .Please send money another number."
    );
  }
  // check receiver exists or not
  const isReceiverExists = await Auth.findOne({ number: receiverNumber });
  if (!isReceiverExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Receiver Account not found.please Enter valid Receiver number."
    );
  }
  // update receiver balance
  let receiverNewBalance;
  if (isReceiverExists?.balance) {
    receiverNewBalance = isReceiverExists?.balance + transactionAmount;
  }
  await Auth.findOneAndUpdate(
    { number: receiverNumber },
    { balance: receiverNewBalance },
    { new: true }
  );
  // update sender balance
  const isSenderExists = await Auth.findOne({ number: senderNumber });
  if (!isSenderExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Your Phone number is wrong, please try again."
    );
  }
  let updateSenderBalance;
  if (isSenderExists.balance) {
    updateSenderBalance = isSenderExists?.balance - transactionAmount;
  }
  await Auth.findOneAndUpdate(
    { number: senderNumber },
    { balance: updateSenderBalance },
    { new: true }
  );

  // create transaction id
  const currentDateTime = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const transactionId = `trns-${currentDateTime}${randomNumber}${transactionAmount}`;
 data.transactionType="sendMoney";
  data.transactionId = transactionId;
  // create new transaction
  const transaction = await Transaction.create(data);

  return transaction;
};

// cash out transaction
const cashOutTransaction = async (data: ITransaction) => {
  const receiverNumber = data?.receiverNumber;
  const senderNumber = data?.senderNumber;
  const password = data?.password;
  let transactionAmount = data?.transactionAmount;
  let commission = (transactionAmount * 1.5) / 100;
  let agentCommission = (transactionAmount * 1) / 100;
  let adminCommission = commission - agentCommission;

  // check user exists or not
  const isUserExists = await Auth.findOne({ number: senderNumber });
  if (!isUserExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "You don't have any account,Registration now"
    );
  }
  // checked password match or not
  const isPassMatch = await bcrypt.compare(
    password as string,
    isUserExists?.password
  );

  if (!isPassMatch) {
    throw new AppError(StatusCodes.NOT_FOUND, "your password is Wrong");
  }
  const userNewBalance = (isUserExists.balance ?? 0) - transactionAmount;

  await Auth.findOneAndUpdate(
    { number: senderNumber },
    { balance: userNewBalance }
  );

  // check receiver exists or not
  const isAgentExists = await Auth.findOne({ number: receiverNumber });
  if (!isAgentExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Receiver Account not found.please Enter valid Receiver number."
    );
  }
  if (isAgentExists && isAgentExists?.accountType != "Agent") {
    throw new AppError(StatusCodes.NOT_FOUND, "Please Select a Agent Number.");
  }
  if (isAgentExists && isAgentExists?.accountStatus != "Verified") {
    throw new AppError(StatusCodes.NOT_FOUND, "Unauthorized Agent.");
  }
  // update agent balance

  let agentNewBalance;
  let agentNewIncome = 0;
  let transferBalance = 0;

  if (transactionAmount) {
    agentNewIncome = agentCommission;
    transferBalance = transactionAmount - commission;
  }

  if (isAgentExists?.balance) {
    agentNewIncome = (isAgentExists.income ?? 0) + agentCommission;
    agentNewBalance =
      isAgentExists?.balance + transferBalance + agentCommission;
  }
  // update agent balance
  await Auth.findOneAndUpdate(
    { number: receiverNumber },
    { balance: agentNewBalance, income: agentNewIncome },
    { new: true }
  );

  // update admin balance and income
  const isAdminExists = await Auth.findOne({ role: "Admin" });

  if (isAdminExists && isAdminExists.balance) {
    const adminNewBalance = isAdminExists?.balance + adminCommission;
    const adminNewIncome = (isAdminExists.income ?? 0) + adminCommission;

    await Auth.findOneAndUpdate(
      { _id: isAdminExists?._id },
      { balance: adminNewBalance, income: adminNewIncome },
      { new: true }
    );
  }

  // create transaction id
  const currentDateTime = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const transactionId = `trns-${currentDateTime}${randomNumber}${transactionAmount}`;
  data.transactionId = transactionId;

  const transactionData = {
    senderNumber: data?.senderNumber,
    receiverNumber: data?.receiverNumber,
    transactionType: "cashOut",
    transactionId: transactionId,
    transactionAmount: data?.transactionAmount,
  };
  // create new transaction
  const transaction = await Transaction.create(transactionData);
  return transaction;
};
// cash in transaction
const cashInTransaction = async (data: ITransaction) => {
  const receiverNumber = data?.receiverNumber;
  const agentNumber = data?.senderNumber;
  const password = data?.password;
  let transactionAmount = data?.transactionAmount;

  // check agent exists or not
  const isAgentExists = await Auth.findOne({ number: agentNumber });

  if (!isAgentExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "You don't have any account,Registration now"
    );
  }
  // checked password match or not
  const isPassMatch = await bcrypt.compare(
    password as string,
    isAgentExists?.password
  );

  if (!isPassMatch) {
    throw new AppError(StatusCodes.NOT_FOUND, "your password is Wrong");
  }
  const agentNewBalance = (isAgentExists.balance ?? 0) - transactionAmount;

  await Auth.findOneAndUpdate(
    { number: agentNumber },
    { balance: agentNewBalance }
  );

  // check user exists or not
  const isUserExists = await Auth.findOne({ number: receiverNumber });
  if (!isUserExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User Account not found.please Enter valid User number."
    );
  }

  const newBalance = (isUserExists.balance ?? 0) + transactionAmount;
  // update user balance
  await Auth.findOneAndUpdate(
    { number: receiverNumber },
    { balance: newBalance },
    { new: true }
  );

  // create transaction id
  const currentDateTime = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const transactionId = `trns-${currentDateTime}${randomNumber}${transactionAmount}`;
  data.transactionId = transactionId;

  const transactionData = {
    senderNumber: data?.senderNumber,
    receiverNumber: data?.receiverNumber,
    transactionType: "cashIn",
    transactionId: transactionId,
    transactionAmount: data?.transactionAmount,
  };
  // create new transaction
  const transaction = await Transaction.create(transactionData);
  return transaction;
};

const addMoneyToAgent=async(data:ITransaction)=>{

const agentNumber = data?.receiverNumber;
  const adminNumber = data?.senderNumber;
  let transactionAmount = data?.transactionAmount;

  // check agent exists or not
  const isAgentExists = await Auth.findOne({ number: agentNumber });

  if (!isAgentExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No Agent Match please select a valid Agent"
    );
  }
 

  const agentNewBalance = (isAgentExists.balance ?? 0) + transactionAmount;

  await Auth.findOneAndUpdate(
    { number: agentNumber },
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
 

  const adminNewBalance = (isAdminExists.balance ?? 0) - transactionAmount;

  await Auth.findOneAndUpdate(
    { role: "Admin" },
    { balance: adminNewBalance }
  );

  // create transaction id
  const currentDateTime = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const transactionId = `trns-${currentDateTime}${randomNumber}${transactionAmount}`;
  data.transactionId = transactionId;

  const transactionData = {
    senderNumber: data?.senderNumber,
    receiverNumber: data?.receiverNumber,
    transactionType: "AddMoney",
    transactionId: transactionId,
    transactionAmount: data?.transactionAmount,
  };
  // create new transaction
  const transaction = await Transaction.create(transactionData);
  return transaction;

}


// get all transaction
const getAllTransactions = async () => {
  const transactions = await Transaction.find();
  return transactions;
};
// get user transaction
const getUserTransaction = async (number: string) => {

  const res = await Transaction.find({
    $or: [{ senderNumber: number }, { receiverNumber: number }],
  }).sort({ createdAt: -1 }).limit(100); 
  return res;
};



export const transactionService = {
  sendMoneyTransaction,
  getAllTransactions,
  getUserTransaction,
  cashOutTransaction,
  cashInTransaction,
  addMoneyToAgent
};
