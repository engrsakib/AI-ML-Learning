import { Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validations";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);
router.get("/", UserController.getAllUsers);


export const UserRoutes = router; 