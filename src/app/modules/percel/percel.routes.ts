import { Router } from "express";
import { verifyToken } from "../../util/verifyToken";
import { role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createPercelZodSchema } from "./percel.validations";
import { ParcelController } from "./percel.controller";



const router = Router();
router.post("/",verifyToken(role.SENDER, role.ADMIN),validateRequest(createPercelZodSchema), ParcelController.createPercel);
router.get("/all", ParcelController.getAllParcels);
router.get("/me",verifyToken(role.SENDER, role.RECIVER, role.ADMIN), ParcelController.getSingleParcel);
router.post("/type/create", verifyToken(role.ADMIN), ParcelController.createParcelTypes);


export const ParcelRoutes = router;