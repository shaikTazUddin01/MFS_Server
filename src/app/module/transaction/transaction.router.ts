import { Router } from "express";
import { transactionController } from "./transaction.controller";

const router = Router();

router.post("/sendMoney", transactionController.sendMoneyTransaction);
router.get("/getTransaction", transactionController.getAllTransactions);
router.get("/getTransaction/:id", transactionController.getTransactionById);

export const TransactionRouter = router;
