import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validations";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyAdminToken } from "../../util/verifyAdminToken";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser,
);
router.get(
  "/",verifyAdminToken("ADMIN", "SUPPERADMIN", "USER"),
  UserController.getAllUsers,
);

export const UserRoutes = router;
