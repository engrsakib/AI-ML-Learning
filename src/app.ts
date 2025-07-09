import express, { Express, Request, Response } from "express";

const app: Express = express();



app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Welcome to the Tour Management System");
});

export default app;
