import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";

export const verifyAdminToken = (req: Request, res: Response, next: NextFunction) => {
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
};
