import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { transactionService } from "./transaction.service";

const sendMoneyTransaction = catchAsync(async (req, res) => {
  const result = await transactionService.sendMoneyTransaction(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Transaction successfully",
    data: result,
  });
});
const cashOutTransaction = catchAsync(async (req, res) => {
  const result = await transactionService.cashOutTransaction(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Transaction successfully",
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await transactionService.getAllTransactions();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All transactions retrieved successfully",
    data: result,
  });
});

const getTransactionById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await transactionService.getSingleTransaction(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Transaction retrieved successfully",
    data: result,
  });
});

export const transactionController = {
  sendMoneyTransaction,
  getAllTransactions,
  getTransactionById,
  cashOutTransaction
};
