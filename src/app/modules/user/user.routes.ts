import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validations";
import { validateRequest } from "../../middleware/validateRequest";
import jwt  from "jsonwebtoken";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser,
);
router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const acccessToken = req.headers.authorization;
      if (!acccessToken) {
        res.status(401).json({ message: "Unauthorized access" });
        return;
      }
      const verifiedToken = jwt.verify(
        acccessToken,
        process.env.JWT_SECRET as string,
      );
      if (!verifiedToken) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      next();
    
    } catch (error) {
      res.status(401).json({ message: "Unauthorized access " + error });
      return;
    }
  },
  UserController.getAllUsers,
);

export const UserRoutes = router;
