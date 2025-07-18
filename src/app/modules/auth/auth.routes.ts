import { Router } from "express";
import { AuthController } from "./auth.controllers";


const router = Router();
router.post("/login", AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout); // Assuming logout is handled similarly to login
export const AuthRoutes = router;