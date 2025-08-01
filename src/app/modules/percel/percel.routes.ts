import { Router } from "express";
import { verifyToken } from "../../util/verifyToken";
import { role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createPercelZodSchema } from "./percel.validations";
import { ParcelController } from "./percel.controller";



const router = Router();
router.post("/create",verifyToken(role.SENDER),validateRequest(createPercelZodSchema), ParcelController.createPercel);
router.get("/", ParcelController.getAllParcels);
router.get("/:slug", ParcelController.getSingleParcel);
router.post("/type/create", verifyToken(role.ADMIN), ParcelController.createParcelTypes);


export const ParcelRoutes = router;