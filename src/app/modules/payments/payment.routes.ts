import { Router } from "express";
import { paymentsController } from "./payments.controller";

const router = Router();
router.post("/success", paymentsController.successPayment);
router.post("/fail", paymentsController.failedPayment);

export const paymentRoutes = router;
