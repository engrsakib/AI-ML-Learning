import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: err.message,
    err,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
