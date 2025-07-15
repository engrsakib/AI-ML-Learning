import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validations";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyToken } from "../../util/verifyToken";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser,
);
router.get(
  "/",verifyToken("ADMIN", "SUPPERADMIN", "USER"),
  UserController.getAllUsers,
);

export const UserRoutes = router;
