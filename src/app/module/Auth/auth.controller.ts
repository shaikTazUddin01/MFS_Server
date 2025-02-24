import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import { StatusCodes } from "http-status-codes";

const createUser = catchAsync(async (req, res) => {
  const { data } = req.body;
  const file = req?.file?.path;

  const result = await authService.createUserInFoDB(
    JSON.parse(data),
    file as string
  );
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
    message: "retrieve success",
    data: result,
  });
});
// login user
const loginUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await authService.loginUser(req.body);

  // console.log(result);

  res.cookie("token",result)
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "login success",
    data: result,
  });
});
// update user
const UpdateUser = catchAsync(async (req, res) => {
  
  const result = await authService.updateUser(req.body);


  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "update success",
    data: result,
  });
});

export const authController = {
  createUser,
  getUser,
  loginUser,
  UpdateUser
};
