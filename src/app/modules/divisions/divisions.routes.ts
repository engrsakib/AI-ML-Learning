import { Router } from "express";
import { divisionsController } from "./divisions.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionSchema } from "./divisions.validations";
import { verifyToken } from "../../util/verifyToken";
import { role } from "../user/user.interface";

const router = Router();
router.post("/create", verifyToken(role.ADMIN, role.SUPER_ADMIN), validateRequest(createDivisionSchema), divisionsController.createDivisions);
router.get("/", verifyToken(role.ADMIN, role.SUPER_ADMIN, role.USER, role.GUIDE), divisionsController.getAllDivisions);
router.get("/:slug", verifyToken(role.ADMIN, role.SUPER_ADMIN, role.USER, role.GUIDE), divisionsController.getSingleDivision);
router.delete("/:id", verifyToken(role.ADMIN, role.SUPER_ADMIN), divisionsController.deleteDivision);

export const DivisionsRoutes = router;