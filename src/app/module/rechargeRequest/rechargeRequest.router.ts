import { Router } from "express";
import { RechargeRequestController } from "./rechargeRequest.controller";


const router = Router();

router.post("/sendRequest",RechargeRequestController.createRechargeRequest );
// router.get("/getRequest", );
// router.patch("/updateRequest/:id", );

export const RechargeRequestRouter = router;
