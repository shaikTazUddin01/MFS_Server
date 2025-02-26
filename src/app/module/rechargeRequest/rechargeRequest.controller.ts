import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RechargeRequestService } from "./rechargeRequest.service";


const createRechargeRequest = catchAsync(async (req, res) => {
    const result = await RechargeRequestService.createRechargeRequest(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Request Send",
      data: result,
    });
  });

  export const RechargeRequestController={
    createRechargeRequest
}