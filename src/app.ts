import express, { Express, Request, Response } from "express";
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

export default app;
