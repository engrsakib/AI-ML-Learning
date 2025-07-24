import { Router } from "express";
import { divisionsController } from "./divisions.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionSchema } from "./divisions.validations";
import { verifyToken } from "../../util/verifyToken";
import { role } from "../user/user.interface";

const router = Router();
router.post("/create", verifyToken(role.ADMIN, role.SUPER_ADMIN), validateRequest(createDivisionSchema), divisionsController.createDivisions);





export const DivisionsRoutes = router;