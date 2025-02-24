import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req, res) => {
  const result = await authService.createUserInFoDB(
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "created success",
    data: result,
  });
});


// login user
const loginUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await authService.loginUser(req.body);

  res.cookie("token",result)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "login success",
    data: result,
  });
});


export const authController = {
  createUser,
  loginUser
};
