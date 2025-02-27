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
const cashInTransaction = catchAsync(async (req, res) => {
  const result = await transactionService.cashInTransaction(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Cash-In successfully",
    data: result,
  });
});
const addMoneyToAgent = catchAsync(async (req, res) => {
  const result = await transactionService.addMoneyToAgent(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Add Money successfully",
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

const getUserTransaction = catchAsync(async (req, res) => {
  const number = req.params.number;
  const result = await transactionService.getUserTransaction(number);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Transaction retrieved successfully",
    data: result,
  });
});
const updateReadNotifi = catchAsync(async (req, res) => {
  
  const result = await transactionService.updateReadNotifi(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "notification read",
    data: result,
  });
});

export const transactionController = {
  sendMoneyTransaction,
  getAllTransactions,
  getUserTransaction,
  cashOutTransaction,
  cashInTransaction,
  addMoneyToAgent,
  updateReadNotifi
};
