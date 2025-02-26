import { AppError } from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "./transaction.model";
import { ITransaction } from "./transaction.interface";
import { Auth } from "../Auth/auth.model";

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
  data.transactionId = transactionId;
  // create new transaction
  const transaction = await Transaction.create(data);

  return transaction;
};


// get all transaction
const getAllTransactions = async () => {
  const transactions = await Transaction.find();
  return transactions;
};

const getSingleTransaction = async (id: string) => {
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    throw new AppError(StatusCodes.NOT_FOUND, "Transaction not found!");
  }
  return transaction;
};

export const transactionService = {
  sendMoneyTransaction,
  getAllTransactions,
  getSingleTransaction,
};
