import { Router } from "express";
import { paymentsController } from "./payments.controller";
import { verifyToken } from "../../util/verifyToken";
import { role } from "../user/user.interface";

const router = Router();
router.post("/success", verifyToken(role.USER, role.ADMIN, role.SUPER_ADMIN, role.ADMIN), paymentsController.successPayment);
router.post("/fail", verifyToken(role.USER, role.ADMIN, role.SUPER_ADMIN, role.ADMIN), paymentsController.failedPayment);
router.post("/cancel", verifyToken(role.USER, role.ADMIN, role.SUPER_ADMIN, role.ADMIN), paymentsController.cancelPayment);

export const paymentRoutes = router;
