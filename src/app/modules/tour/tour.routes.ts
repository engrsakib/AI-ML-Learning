import { Router } from "express";
import { TourController } from "./tour.controller";
import { verifyToken } from "../../util/verifyToken";
import { role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createTourZodSchema } from "./tour.validations";

const router = Router();
router.post("/create",verifyToken(role.ADMIN, role.SUPER_ADMIN),validateRequest(createTourZodSchema), TourController.createTour);




export const TourRoutes = router;