import { Router } from "express";
import { AuthController } from "./auth.controllers";


const router = Router();
router.post("/login", AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
export const AuthRoutes = router;