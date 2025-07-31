import { Router } from "express";
import { paymentsController } from "./payments.controller";

const router = Router();
router.post("/success", paymentsController.successPayment);

export const paymentRoutes = router;
