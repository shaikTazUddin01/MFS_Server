import { Router } from "express";
import { RechargeRequestController } from "./rechargeRequest.controller";


const router = Router();

router.post("/sendRequest",RechargeRequestController.createRechargeRequest );
router.get("/getRequest",RechargeRequestController.getRechargeRequest );
router.post("/rechargeRequest",RechargeRequestController.addMoneyToAgent );


export const RechargeRequestRouter = router;
