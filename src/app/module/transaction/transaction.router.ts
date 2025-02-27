import { Router } from "express";
import { transactionController } from "./transaction.controller";

const router = Router();

router.post("/sendMoney", transactionController.sendMoneyTransaction);
router.post("/cashOut", transactionController.cashOutTransaction);
router.post("/cashIn", transactionController.cashInTransaction);
router.post("/addMoney", transactionController.addMoneyToAgent);
router.patch("/readNotifi", transactionController.updateReadNotifi);
router.get("/getTransaction", transactionController.getAllTransactions);
router.get("/getTransaction/:number", transactionController.getUserTransaction);

export const TransactionRouter = router;
