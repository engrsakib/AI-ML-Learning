import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Welcome to the Tour Management System");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: err.message,
    stack: err.stack,
  });
  next();
});

export default app;
