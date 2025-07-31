import { Router } from "express";
import { paymentsController } from "./payments.controller";

const router = Router();
router.post("/success", paymentsController.successPayment);
router.post("/fail", paymentsController.failedPayment);
router.post("/cancel", paymentsController.cancelPayment);

export const paymentRoutes = router;
