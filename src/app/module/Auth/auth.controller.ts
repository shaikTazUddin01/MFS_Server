import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req, res) => {
  const result = await authService.createUserInFoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "created success",
    data: result,
  });
});

// get user
const getUser = catchAsync(async (req, res) => {
  const result = await authService.getUser();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "all user retrieve success",
    data: result,
  });
});

// get single user
const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await authService.getSingleUser(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "retrieve success",
    data: result,
  });
});

// login user
const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);

  res.cookie("token", result);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "login success",
    data: result,
  });
});

export const authController = {
  createUser,
  getUser,
  getSingleUser,
  loginUser,
};
