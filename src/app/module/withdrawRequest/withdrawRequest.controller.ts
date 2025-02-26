import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { WithdrawRequestService } from "./withdrawRequest.service";



const createWithDrawRequest = catchAsync(async (req, res) => {
    const result = await WithdrawRequestService.createWithDrawRequest(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Request Send",
      data: result,
    });
  });

  export const WithdrawRequestController={
    createWithDrawRequest
}