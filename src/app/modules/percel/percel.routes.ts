import { Router } from "express";
import { TourController } from "./percel.controller";
import { verifyToken } from "../../util/verifyToken";
import { role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createTourZodSchema } from "./percel.validations";

const router = Router();
router.post("/create",verifyToken(role.SENDER),validateRequest(createTourZodSchema), TourController.createTour);
router.get("/", TourController.getAllTours);
router.get("/:slug", TourController.getSingleTour);
router.post("/type/create", verifyToken(role.ADMIN), TourController.createTourTypes);


export const PercelRoutes = router;