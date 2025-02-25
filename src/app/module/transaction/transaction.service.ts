import { AppError } from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import { Transaction } from "./transaction.model";
import { ITransaction } from "./transaction.interface";

const createTransactionInDB = async (data: ITransaction) => {
  const currentDateTime = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  const transactionId = `trns-${currentDateTime}${randomNumber}${data?.transactionAmount}`;

  data.transactionId=transactionId
  
  const transaction = await Transaction.create(data);

  return transaction;
};

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
  createTransactionInDB,
  getAllTransactions,
  getSingleTransaction,
};
