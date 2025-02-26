import { Router } from "express";
import { WithdrawRequestController } from "./withdrawRequest.controller";



const router = Router();

router.post("/sendRequest",WithdrawRequestController.createWithDrawRequest );
// router.get("/getRequest", );
// router.patch("/updateRequest/:id", );

export const withdrawRequestRouter = router;
